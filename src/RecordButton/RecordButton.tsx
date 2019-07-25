import React, { FunctionComponent } from 'react';
import { StyleSheet, Text, View, ViewProps, TouchableOpacity } from 'react-native';
import { Audio } from 'expo-av';
import * as Permissions from 'expo-permissions';
import { Recorder } from './lib/Recorder';


type RecordButtonProps = ViewProps & {
  // onStart: () => void;
  // onEnd: () => void;
}




export const RecordButton: FunctionComponent<RecordButtonProps> = (props) => {
  const recorder = new Recorder();

  const stopRecording = async () => {
    const recording = await recorder.stopAndGetRecording();

    // console.log('Recording Result', recording);

    if (recording) {
      recording.playAsync();
    }
  }

  return (
    <TouchableOpacity
      // onPress={() => props.onPress('press')}
      // // onLongPress={() => props.onPress('long')}
      onPressIn={() => recorder.start()}
      onPressOut={() => stopRecording()}
    >
      <View style={styles.container} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'red',
    borderRadius: 50,
    height: 70,
    width: 70,
  },
});
