import React, { Component } from 'react';
import { createStackNavigator, CreateAppContainer } from 'react-navigation';
import Notifications from '../Screens/Notifications/Notifications';
import KweekExtendedView from '../Screens/KweekExtendedView/KweekExtendedView';
import CreateTweet from '../Screens/CreateTweet/CreateTweet';
import ProfileStackNavigator from './ProfileStackNavigator';
import FollowerList from '../Screens/FollowerList/FollowersList';
import FollowingList from '../Screens/FollowingList/FollowingList';

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
  FollowerList: { screen: FollowerList,
    navigationOptions: {
      header: null,
    }, },
  FollowingList: { screen: FollowingList,
    navigationOptions: {
      header: null,
    }, },
  CreateTweet: { screen: CreateTweet },
  Profile: { screen: ProfileStackNavigator,
    navigationOptions: {
      header: null,
    }, },
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