import React, { FunctionComponent } from 'react';
import { StyleSheet, Text, View, ViewProps } from 'react-native';

type ButtonProps = ViewProps & {
  onPress: () => void;
}

export const Button: FunctionComponent<ButtonProps> = (props) => {
  return (
    <View style={styles.container}>
      <Text>Record Button</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'green',
  },
});
