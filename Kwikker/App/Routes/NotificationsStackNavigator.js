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
NotificationsStackNavigator.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;
  if (navigation.state.index > 0) {
    tabBarVisible = false;
  }

  return {
    tabBarVisible,
  };
};
export default NotificationsStackNavigator;