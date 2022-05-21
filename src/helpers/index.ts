import notifee, {
  AndroidImportance,
  AndroidNotificationSetting,
  RepeatFrequency,
  TimestampTrigger,
  TriggerType,
} from '@notifee/react-native';
import { Platform } from 'react-native';

const settings = notifee.getNotificationSettings();
export async function onCreateTriggerNotification() {
  if (
    Platform.OS === 'android' &&
    (await settings).android.alarm === AndroidNotificationSetting.ENABLED
  ) {
    await createTriggerNotification();
  } else {
    await notifee.openAlarmPermissionSettings();
  }
}

export async function createTriggerNotification() {
  const date = new Date(Date.now());
  date.setHours(14);
  date.setMinutes(0);
  const trigger: TimestampTrigger = {
    type: TriggerType.TIMESTAMP,
    timestamp: date.getTime(),
    repeatFrequency: RepeatFrequency.DAILY,
    alarmManager: {
      allowWhileIdle: true,
    },
  };

  await notifee.createTriggerNotification(
    {
      title: 'Reminder',
      body: 'Notification created to run everyday at 2pm for 10 days',
      android: {
        channelId: await channelId(),
      },
    },
    trigger,
  );
}

export const channelId = async () =>
  await notifee.createChannel({
    id: 'default',
    name: 'default',
    importance: AndroidImportance.HIGH,
  });

export async function cancel(notificationId: string) {
  await notifee.cancelNotification(notificationId);
}
