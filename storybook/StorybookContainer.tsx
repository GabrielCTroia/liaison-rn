import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Constants } from 'expo';

import StorybookUIRoot from './index'

export function StorybookContainer() {
  return (
    <View style={styles.container}>
      <StorybookUIRoot />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#F5FCFF',
  },
});
