import { Audio } from 'expo-av';
import * as Permissions from 'expo-permissions';

export type Sound = Audio.Sound;

export class Recorder {
  private activeRecording?: Audio.Recording;
  private preparedRecording?: Audio.Recording;

  async prepare() {
    const { status } = await Permissions.askAsync(Permissions.AUDIO_RECORDING);

    if (status !== 'granted') {
      throw new Error('Audio recording Permission not granted!');
    }

    await Audio.setAudioModeAsync({
      allowsRecordingIOS: true,
      interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
      playsInSilentModeIOS: true,

      shouldDuckAndroid: true,
      interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,

      playThroughEarpieceAndroid: false,
      staysActiveInBackground: false,
    });

    const recording = new Audio.Recording();
    await recording.prepareToRecordAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY);

    this.preparedRecording = recording;

    console.log('finished preparing');
  }

  async start() {
    if (this.activeRecording) {
      console.log('currently recording');
      return;
    }

    if (!this.preparedRecording) {
      console.log('no prepared recording');
      return;
    }

    
    try {
      console.log('starting recording');
      await this.preparedRecording.startAsync();

      // Wait for it to start before setting a reference to it!
      this.activeRecording = this.preparedRecording;
      this.preparedRecording = undefined;
      
    } catch (error) {
      console.log('Recoring Error', error);
      this.activeRecording = undefined;
    }
  }

  async stopAndGetRecording() {
    if (!this.activeRecording) {
      console.log('No active recording');

      return null; 
    }

    await this.activeRecording.stopAndUnloadAsync();

    const uri = this.activeRecording.getURI();
    
    this.activeRecording = undefined;

    return uri;
  }
}
