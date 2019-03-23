import React, { Component } from 'react';
import { createStackNavigator, CreateAppContainer } from 'react-navigation';
import Notifications from '../Screens/Notifications/Notifications';

const NotificationsStackNavigator = createStackNavigator({

  Notifictions: {
    screen: Notifications,
    navigationOptions: {
      title: 'Notifications'
    }
  }
});
export default NotificationsStackNavigator;