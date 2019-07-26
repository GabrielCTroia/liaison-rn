import React, { FunctionComponent } from './node_modules/react';
import { View, StyleSheet, ViewProps } from 'react-native';

export const CenterView: FunctionComponent<ViewProps> = ({ children }) => {
  return <View style={styles.main}>{children}</View>;
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});
