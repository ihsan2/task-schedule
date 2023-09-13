// In App.js in a new project

import * as React from 'react';
import {PermissionsAndroid} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import HomeScreen from './src/pages/Home';
import FormScreen from './src/pages/Form';
import {Provider} from 'react-redux';
import store from './src/store';
import notifee, {EventType} from '@notifee/react-native';

const Stack = createNativeStackNavigator();

const App = () => {
  const reqetsPermission = async () => {
    await notifee.requestPermission();
    PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
    );
  };

  React.useEffect(() => {
    reqetsPermission();
  });

  React.useEffect(() => {
    const unsubscribe = notifee.onForegroundEvent(({type, detail}) => {
      handleForegroundEvent();
    });

    return unsubscribe();
  }, []);

  const handleForegroundEvent = async () => {
    if (
      type === EventType.ACTION_PRESS &&
      detail.pressAction?.id === 'default'
    ) {
      await notifee.cancelNotification(detail.notification?.id);
    }
  };

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Form" component={FormScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
