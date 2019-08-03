import React, { FunctionComponent, useEffect, useState } from 'react';
import { StyleSheet, ViewProps } from 'react-native';
import { Recorder } from '../../../../lib/Recorder';
import { Colors } from '../../../../styles';
import { CircleButton } from '../../../../components/CircleButton';
import * as Haptics from 'expo-haptics';

type RecordButtonProps = ViewProps & {
  onRecorded?: (uri: string) => void;
}

const recorder = new Recorder();

export const RecordButton: FunctionComponent<RecordButtonProps> = (props) => {

  const [recordings, update] = useState(0);

  useEffect(() => {
    // This is done preemptively because otherwise it spends ~300ms of the recording
    recorder.prepare();

  // as long as we have a new recording we should preemptively prepare
  }, [recordings]);
  
  const startRecording = () => {
    // Haptics.impactAsync();
    Haptics.notificationAsync();

    recorder.start();
  }

  const stopRecording = async () => {
    // Haptics.notificationAsync();

    const sound = await recorder.stopAndGetRecording();

    // console.log('Recording Result', recording);

    if (sound && props.onRecorded) {
      props.onRecorded(sound);

      update(recordings + 1);
    }
  }

  return (
    <CircleButton
      style={props.style}
      color={Colors.red}
      iconSource={require("../../../../../assets/sound_wave_button.png")}
      onPressIn={startRecording}
      onPressOut={stopRecording}
    />
  );
}


const styles = StyleSheet.create({

});
