import React, { Component } from 'react';
import FollowingList from './../Screens/FollowingList/FollowingList';
import { createStackNavigator, CreateAppContainer } from 'react-navigation'

const FollowingListNavigator = createStackNavigator({

    FollowingList: { screen: FollowingList }
});
export default FollowingListNavigator