import { useEffect } from 'react';
import messaging from '@react-native-firebase/messaging';
import notifee from '@notifee/react-native';
import { DEVICE_TOKEN, getToken, saveToken } from 'config/asyncStorage';
import { channelId } from 'helpers';
import { useAppDispatch } from 'store/hooks';
import { saveFCMToken } from 'store/reducers/authReducer';

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
  const dispatch = useAppDispatch();
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
        dispatch(saveFCMToken({ token }));
      }
    }

    fetchToken();

    messaging().onMessage(onMessageReceived);
    messaging()
      .getInitialNotification()
      .then(res => console.log(res));
  }, []);
};
