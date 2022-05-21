import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppRoute from './src/appRoute';
import { Provider } from 'react-redux';
import { store } from './src/store';
import { useNotification } from './src/hooks/useNotification';

const App = () => {
  useNotification();
  return (
    <Provider store={store}>
      <NavigationContainer>
        <AppRoute />
      </NavigationContainer>
    </Provider>
  );
};

export default App;
