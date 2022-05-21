import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';
import React, { FC } from 'react';

export const Button: FC<
  {
    label: string;
    color?: string;
  } & TouchableOpacityProps
> = props => {
  const setBgColor = () => ({
    backgroundColor: props.color ? props.color : '#1E90FF',
  });

  return (
    <TouchableOpacity {...props} style={[styles.btn, { ...setBgColor() }]}>
      <Text style={styles.btnText}>{props.label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btnText: {
    color: '#fff',
    fontWeight: '500',
  },
  btn: {
    padding: 12,
    alignItems: 'center',
    borderRadius: 5,
  },
});

export default Button;
