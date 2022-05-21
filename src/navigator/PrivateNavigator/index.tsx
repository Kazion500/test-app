import React, { useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import routes from 'resources/routes.json';
import Welcome from 'screens/Welcome';
import WelcomeDetail from 'screens/WelcomeDetail';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { getData, welcomeSelector } from 'store/reducers/welcomeReducer';
import Spiner from 'components/atoms/Spiner';

const MainStack = createNativeStackNavigator();

export const PrivateStack = () => {
  const { info, isLoading } = useAppSelector(welcomeSelector);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getData());
  }, [dispatch]);

  return (
    <>
      {isLoading ? (
        <Spiner />
      ) : (
        <MainStack.Navigator
          initialRouteName={info.length ? routes.details : routes.welcome}>
          <MainStack.Screen
            options={{
              title: 'Add User',
            }}
            name={routes.welcome}
            component={Welcome}
          />
          <MainStack.Screen
            options={{
              title: 'All Users',
            }}
            name={routes.details}
            component={WelcomeDetail}
          />
        </MainStack.Navigator>
      )}
    </>
  );
};
