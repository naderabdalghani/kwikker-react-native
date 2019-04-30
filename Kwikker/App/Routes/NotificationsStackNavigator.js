import React, { Component } from 'react';
import { createStackNavigator, CreateAppContainer } from 'react-navigation';
import Notifications from '../Screens/Notifications/Notifications';
import KweekExtendedView from '../Screens/KweekExtendedView/KweekExtendedView';
import CreateTweet from '../Screens/CreateTweet/CreateTweet';

const NotificationsStackNavigator = createStackNavigator({

  Notifictions: {
    screen: Notifications,
    navigationOptions: {
      title: 'Notifications',
      headerStyle: {
        backgroundColor: 'transparent'
      },
    }
  },
  KweekExtendedView: {
    screen: KweekExtendedView,
    navigationOptions: {
      title: 'Kweek',
    }
  },
  CreateTweet: { screen: CreateTweet },
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