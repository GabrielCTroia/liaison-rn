import React from 'react';
import { StyleSheet, View } from 'react-native';
import { StorybookContainer } from './storybook/StorybookContainer';
import AppNavigator from './src/navigation/AppNavigator';
import { Provider } from 'react-redux';
import { store } from './src/redux/store';


export default function App() {
  // return <StorybookContainer />

  return (
    <Provider store={store}>
      <View style={styles.container}>
        <AppNavigator />
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
