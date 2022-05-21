import Button from 'components/atoms/Button';
import Spiner from 'components/atoms/Spiner';
import React from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { authSelector, signInWithGoogle } from 'store/reducers/authReducer';

const Login = () => {
  const { isLoading, error } = useAppSelector(authSelector);
  const dispatch = useAppDispatch();

  if (isLoading) {
    return <Spiner />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={require('assets/images/logo.png')} style={styles.logo} />
      </View>
      <Button
        label="Sign in with google"
        onPress={() => dispatch(signInWithGoogle())}
      />
      {error.register && <Text>Something went wrong please try again</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    width: 100,
    height: 100,
    marginVertical: 20,
  },
  logo: {
    resizeMode: 'contain',
    width: '100%',
    height: '100%',
  },
});

export default Login;
