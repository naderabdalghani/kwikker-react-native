import React, { Component } from 'react';
import Profile from './../Screens/Profile/Profile';
import FollowerList from './../Screens/FollowerList/FollowersList'
import FollowingList from './../Screens/FollowingList/FollowingList'
import EditProfileNavigator from './EditProfileNavigation'
import { createStackNavigator, CreateAppContainer } from 'react-navigation'

const ProfileStackNavigator = createStackNavigator({

    Profile: { screen: Profile },
    FollowerList: { screen: FollowerList},
    FollowingList: { screen: FollowingList},
    EditProfileNavigator: {screen: EditProfileNavigator},
});
export default ProfileStackNavigator;