import React, { Component } from 'react';
import { createStackNavigator, CreateAppContainer } from 'react-navigation';
import Image from 'react-native';
import Home from '../Screens/Home/Home';
import FollowersList from '../Screens/FollowerList/FollowersList';
import FollowingsList from '../Screens/FollowingList/FollowingList';

const HomeStackNavigator = createStackNavigator({

  Homes: {
    screen: Home,
    navigationOptions: {
      title: 'Home',
    }
  },
  FollowersList: { screen: FollowersList },
  FollowingsList: { screen: FollowingsList },
});
export default HomeStackNavigator;
