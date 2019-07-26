import { Audio } from 'expo-av';


export class Player {
  async play(uri: string) {
    const soundObject = new Audio.Sound();

    try {
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
        interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
        playsInSilentModeIOS: true,
        // playsInSilentLockedModeIOS: true,
        shouldDuckAndroid: true,
        interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
        staysActiveInBackground: false,
        playThroughEarpieceAndroid: false,
      });

      await soundObject.loadAsync({
        uri,
      });

      await soundObject.setVolumeAsync(1.0);

      await soundObject.playAsync();
    } catch (e) {
      console.log('Player.play Error', e);

      throw e;
    }
  }
}