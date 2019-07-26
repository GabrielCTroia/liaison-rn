import React from 'react';
import { FunctionComponent } from 'react';
import { StyleSheet, View, TextInputProps, TextInput } from 'react-native';
import { Colors, Layout } from '../../styles';


// export type TextInputProps = TextInputProps & {
//   // placeholder: string;
// }

export const InputField: FunctionComponent<TextInputProps> = (props) => {
  const { style, ...restProps } = props;

  return (
    <View style={[styles.container, style]}>
      <TextInput style={styles.input} {...restProps} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: Colors.white,
    width: '100%',
    borderRadius: 10,
    // paddingHorizontal: 20,
  },
  input: {
    padding: 20,
  }
});
