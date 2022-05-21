import { PrivateStack } from 'navigator/PrivateNavigator';
import { PublicStackScreen } from 'navigator/PublicNavigator';
import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import Spiner from 'components/atoms/Spiner';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { authSelector, updateUser } from 'store/reducers/authReducer';

const AppRoute = () => {
  const [initializing, setInitializing] = useState(true);
  const { user } = useAppSelector(authSelector);
  // const [user, setUser] = useState<FirebaseAuthTypes.User | null>();
  const dispatch = useAppDispatch();

  const onAuthStateChanged =
    useCallback<FirebaseAuthTypes.AuthListenerCallback>(
      (authUser: FirebaseAuthTypes.User | null) => {
        dispatch(updateUser(authUser));
        if (initializing || !user) {
          setInitializing(false);
        }
      },
      [dispatch, initializing, user],
    );

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, [onAuthStateChanged]);

  if (initializing) {
    return <Spiner />;
  }

  return (
    <SafeAreaView style={styles.safe}>
      {!user ? <PublicStackScreen /> : <PrivateStack />}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: {
    flex: 1,
  },
});

export default AppRoute;
