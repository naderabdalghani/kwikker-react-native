import React, { Component } from 'react';
import { createStackNavigator, CreateAppContainer } from 'react-navigation';
import Profile from '../Screens/Profile/Profile';
import FollowerList from '../Screens/FollowerList/FollowersList';
import FollowingList from '../Screens/FollowingList/FollowingList';
import EditProfileNavigator from './EditProfileNavigation';
import KweekExtendedView from '../Screens/KweekExtendedView/KweekExtendedView';
import CreateTweet from '../Screens/CreateTweet/CreateTweet';


const ProfileStackNavigator = createStackNavigator({

  Profile: { screen: Profile,
    navigationOptions: {
      header: null,
    }, },
  FollowerList: { screen: FollowerList,
    navigationOptions: {
      header: null,
    }, },
  FollowingList: { screen: FollowingList,
    navigationOptions: {
      header: null,
    }, },
  EditProfileNavigator: { screen: EditProfileNavigator,
    navigationOptions: {
      header: null,
    }, },
  KweekExtendedView: {
    screen: KweekExtendedView,
    navigationOptions: {
      title: 'Kweek',
    }
  },
  CreateTweet: { screen: CreateTweet },
});
export default ProfileStackNavigator;