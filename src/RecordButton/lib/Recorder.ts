import { Audio } from 'expo-av';
import * as Permissions from 'expo-permissions';

export class Recorder {
  private activeRecording: Audio.Recording | null = null;

  async start() {
    if (this.activeRecording) {
      return;
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

    const { status } = await Permissions.askAsync(Permissions.AUDIO_RECORDING);

    if (status !== 'granted') {
      throw new Error('Audio recording Permission not granted!');
    }

    const recording = new Audio.Recording();

    try {
      await recording.prepareToRecordAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY);
      await recording.startAsync();

      // Wait for it to start before setting a reference to it!
      this.activeRecording = recording;

    } catch (error) {
      this.activeRecording = null;
    }
  }

  async stopAndGetRecording() {
    if (!this.activeRecording) {
      console.log('no active recording');

      return null; 
    }

    await this.activeRecording.stopAndUnloadAsync();

    const { sound } = await this.activeRecording.createNewLoadedSoundAsync({
      isLooping: false,
      isMuted: false,
      volume: 1.0,
      rate: 1.0,
      shouldCorrectPitch: true,
    });

    this.activeRecording = null;
    // this.startTime = null;

    console.log('there is sound');

    return sound;
  }
}
