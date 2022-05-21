import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import routes from 'resources/routes.json';
import Welcome from 'screens/Welcome';
import WelcomeDetail from 'screens/WelcomeDetail';

const MainStack = createNativeStackNavigator();

export const PrivateStack = () => {
  return (
    <MainStack.Navigator initialRouteName={routes.welcome}>
      <MainStack.Screen
        options={{
          title: 'Welcome',
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
  );
};
