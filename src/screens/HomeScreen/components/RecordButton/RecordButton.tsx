import React, { FunctionComponent } from 'react';
import { StyleSheet, View, ViewProps, TouchableOpacity, Image } from 'react-native';
import { Recorder, Sound } from './lib/Recorder';
import { Colors } from '../../../../styles';
import { CircleButton } from '../../../../components/CircleButton';

export type RecordedSound = Sound;

type RecordButtonProps = ViewProps & {
  onRecorded?: (uri: string) => void;
}

export const RecordButton: FunctionComponent<RecordButtonProps> = (props) => {
  const recorder = new Recorder();

  recorder.prepare();

  const startRecording = () => {
    recorder.start();
  }

  const stopRecording = async () => {
    const sound = await recorder.stopAndGetRecording();

    // console.log('Recording Result', recording);

    if (sound && props.onRecorded) {
      props.onRecorded(sound);
      // recording.playAsync();
    }
  }

  return (
    <CircleButton
      color={Colors.red}
      iconSource={require("../../../../../assets/sound_wave_button.png")}
      onPressIn={startRecording}
      onPressOut={stopRecording}
    />
  );
}


const styles = StyleSheet.create({

});
