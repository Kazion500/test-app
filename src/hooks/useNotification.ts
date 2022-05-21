import { useEffect } from 'react';
import messaging from '@react-native-firebase/messaging';
import notifee from '@notifee/react-native';
import { DEVICE_TOKEN, getToken, saveToken } from 'config/asyncStorage';
import { channelId } from 'helpers';

export async function onMessageReceived(message: any) {
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
      await messaging().requestPermission();
    }

    requestUserPermission();
  }, []);

  useEffect(() => {
    async function fetchToken() {
      const token = await messaging().getToken();
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
