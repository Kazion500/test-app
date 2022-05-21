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
  } & TouchableOpacityProps
> = props => {
  return (
    <TouchableOpacity {...props} style={styles.btn}>
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
    backgroundColor: '#1E90FF',
    padding: 12,
    alignItems: 'center',
    borderRadius: 5,
  },
});

export default Button;
