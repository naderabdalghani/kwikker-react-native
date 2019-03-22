import React, { Component } from 'react';
import Profile from './../Screens/Profile/Profile';
import FollowersListNavigator from './FolloersListNavigator'
import FollowingListNavigator from './FollowingListNavigator'
import EditProfileNavigator from './EditProfileNavigation'
import { createStackNavigator, CreateAppContainer } from 'react-navigation'

const ProfileStackNavigator = createStackNavigator({

    Profile: { screen: Profile },
    FollowersListNavigator: { screen: FollowersListNavigator},
    FollowingListNavigator: { screen :FollowingListNavigator},
    EditProfileNavigator: {screen: EditProfileNavigator},
});
export default ProfileStackNavigator