import React, { FunctionComponent } from 'react';
import { StyleSheet, View, TouchableOpacity, Image, TouchableOpacityProps, ImageURISource } from 'react-native';

type RecordButtonProps = TouchableOpacityProps & {
  iconSource?: ImageURISource,
  color?: string;
  size?: number;
}

export const CircleButton: FunctionComponent<RecordButtonProps> = (props) => {
  const icon = props.iconSource
    ? (<Image style={styles.icon} source={props.iconSource} />)
    : null;

  const { style, ...rest } = props;

  return (
    <TouchableOpacity {...rest}
      style={[styles.container, style, {
        ...props.color && { backgroundColor: props.color },
        ...props.size && { width: props.size, height: props.size },
      }]}>
      {icon}
    </TouchableOpacity>
  );
}


const styles = StyleSheet.create({
  container: {
    backgroundColor: 'grey',
    borderRadius: 50,
    height: 70,
    width: 70,
    textAlign: 'center',
    display: 'flex',
    justifyContent: 'center',
  },
  icon: {
    alignSelf: 'center',
  }
});
