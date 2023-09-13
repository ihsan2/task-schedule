import moment from 'moment';
import notifee, {AndroidImportance, TriggerType} from '@notifee/react-native';

// create / update notification
export const onCreateTriggerNotification = async data => {
  // fire notification 5 minutes before task schedule
  let date5Minutues = moment(data?.date.toDate()).subtract(5, 'minutes');

  const date = new Date(date5Minutues.format('YYYY-MM-DD'));
  date.setHours(Number(date5Minutues.format('H')));
  date.setMinutes(Number(date5Minutues.format('m')));

  const trigger = {
    type: TriggerType.TIMESTAMP,
    timestamp: date.getTime(),
  };

  const channelId = await notifee.createChannel({
    id: 'default',
    name: 'Default Channel',
  });

  await notifee.createTriggerNotification(
    {
      id: data.id,
      title: data.name,
      body: 'Your task is waiting for you, prepare yourself to carry out your task.',
      android: {
        channelId,
        importance: AndroidImportance.HIGH,
      },
    },
    trigger,
  );
};

// cancel notification
export const cancelTriggerNotification = async id => {
  await notifee.cancelTriggerNotification(id);
};
