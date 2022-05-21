import { ActivityIndicator, StyleSheet } from 'react-native';
import React from 'react';

const Spiner = () => {
  return (
    <ActivityIndicator size={'large'} color="blue" style={styles.spiner} />
  );
};
const styles = StyleSheet.create({
  spiner: { flex: 1 },
});
export default Spiner;
