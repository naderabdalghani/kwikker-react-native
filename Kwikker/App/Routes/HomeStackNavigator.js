import React, { Component } from 'react';
import { createStackNavigator, CreateAppContainer } from 'react-navigation';
import Image from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import Home from '../Screens/Home/Home';
import FollowersList from '../Screens/FollowerList/FollowersList';
import FollowingsList from '../Screens/FollowingList/FollowingList';
import CreateTweet from '../Screens/CreateTweet/CreateTweet';

const HomeStackNavigator = createStackNavigator({

  Homes: {
    screen: Home,
    navigationOptions: {
      title: 'Home',
    }
  },
  FollowersList: { screen: FollowersList },
  FollowingsList: { screen: FollowingsList },
  CreateTweet: { screen: CreateTweet },
});
HomeStackNavigator.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;
  if (navigation.state.index > 0) {
    tabBarVisible = false;
  }

  return {
    tabBarVisible,
  };
};
export default HomeStackNavigator;
