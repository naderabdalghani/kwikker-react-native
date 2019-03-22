import React, { Component } from 'react';
import FollowerList from './../Screens/FollowerList/FollowersList';
import { createStackNavigator, CreateAppContainer } from 'react-navigation'

const FollowersListNavigator = createStackNavigator({

    FollowerList: { screen: FollowerList }
});
export default FollowersListNavigator