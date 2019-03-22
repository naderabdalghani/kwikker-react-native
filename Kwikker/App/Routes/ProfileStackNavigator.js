import React, { Component } from 'react';
import { createStackNavigator, CreateAppContainer } from 'react-navigation';
import Profile from '../Screens/Profile/Profile';
import FollowersListNavigator from './FollowersListNavigator';
import FollowingListNavigator from './FollowingListNavigator';
import EditProfileNavigator from './EditProfileNavigation';

const ProfileStackNavigator = createStackNavigator({

  Profile: { screen: Profile },
  FollowersListNavigator: { screen: FollowersListNavigator },
  FollowingListNavigator: { screen: FollowingListNavigator },
  EditProfileNavigator: { screen: EditProfileNavigator },
});
export default ProfileStackNavigator;