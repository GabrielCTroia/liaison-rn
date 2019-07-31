import { Audio } from 'expo-av';
import * as Permissions from 'expo-permissions';

export type Sound = Audio.Sound;

export class Recorder {
  private activeRecording?: Audio.Recording;
  private preparedRecording?: Audio.Recording;

  async askForPermissions() {
    const { status } = await Permissions.askAsync(Permissions.AUDIO_RECORDING);

    if (status !== 'granted') {
      throw new Error('Audio recording Permission not granted!');
    }
  }

  private async setAudioMode(allowsRecordingIOS: boolean) {
    try {
      await Audio.setAudioModeAsync({
        allowsRecordingIOS,
        interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
        playsInSilentModeIOS: true,

        shouldDuckAndroid: true,
        interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,

        playThroughEarpieceAndroid: false,
        staysActiveInBackground: false,
      });
    } catch (e) {
      console.log('Recorder.setAudioMode Error', e);
      throw e;
    }
  }

  async prepare() {
    if (this.preparedRecording) {
      return;
    }

    await this.askForPermissions();

    await this.setAudioMode(true);

    const recording = new Audio.Recording();
    await recording.prepareToRecordAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY);

    this.preparedRecording = recording;
  }

  async start() {
    if (this.activeRecording) {
      return;
    }

    if (!this.preparedRecording) {
      return;
    }

    try {
      // Hack: If this isn't here and we play the sounds
      //  It will reset it to false
      //  And since the preparatin is preemptive, a playback will possibly overite it false again!
      //  Note: Also, this is muych faster than the whole preparation step!
      //        Hence, being here will not slow the recording down
      await this.setAudioMode(true);

      await this.preparedRecording.startAsync();

      // Wait for it to start before setting a reference to it!
      this.activeRecording = this.preparedRecording;
      this.preparedRecording = undefined;

    } catch (error) {
      console.log('Recorder.start Error', error);

      this.activeRecording = undefined;
      this.preparedRecording = undefined;

      throw (error);
    }
  }

  async stopAndGetRecording() {
    if (!this.activeRecording) {
      return null;
    }

    try {
      await this.activeRecording.stopAndUnloadAsync();
      await this.setAudioMode(false);

      const uri = this.activeRecording.getURI();

      this.activeRecording = undefined;

      return uri;
    } catch (e) {
      console.log('Recorder.stopAndGetRecording Error', e);
      throw e;
    }
  }
}
