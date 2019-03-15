import React, { Component } from 'react';
import Profile from './../Screens/Profile/Profile';
import { createStackNavigator, CreateAppContainer } from 'react-navigation'

const ProfileStackNavigator = createStackNavigator({

    Profile: { screen: Profile }
});
export default ProfileStackNavigator