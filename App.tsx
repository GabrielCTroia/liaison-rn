import React from 'react';
import { StyleSheet, View } from 'react-native';
import { StorybookContainer } from './storybook/StorybookContainer';
import AppNavigator from './src/navigation/AppNavigator';

export default function App() {
  // return <StorybookContainer />

  return (
    <View style={styles.container}>
      <AppNavigator />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
