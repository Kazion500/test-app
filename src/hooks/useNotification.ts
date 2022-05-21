import { useEffect } from 'react';
import messaging from '@react-native-firebase/messaging';
import notifee from '@notifee/react-native';
import { DEVICE_TOKEN, getToken, saveToken } from 'config/asyncStorage';
import { channelId } from 'helpers';

export async function onMessageReceived(message: any) {
  console.log('onMessageReceived', message);

  await notifee.displayNotification({
    title: message.notification.title,
    body: message.notification.body,

    android: {
      channelId: await channelId(),
    },
  });
}

export const useNotification = async () => {
  useEffect(() => {
    async function requestUserPermission() {
      const authStatus = await messaging().requestPermission();
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

      if (enabled) {
        console.log('Authorization status:', authStatus);
      } else {
        console.log('Authorization status else:', authStatus);
      }
    }

    requestUserPermission();
  }, []);

  useEffect(() => {
    async function fetchToken() {
      const token = await messaging().getToken();
      console.log('Token:', token);
      const deviceToken = await getToken(DEVICE_TOKEN);
      if (!deviceToken) {
        saveToken(DEVICE_TOKEN, token);
      }
    }

    fetchToken();

    messaging().onMessage(onMessageReceived);
    messaging()
      .getInitialNotification()
      .then(res => console.log(res));
  }, []);
};
