import React, { Component } from 'react';
import { createStackNavigator, CreateAppContainer } from 'react-navigation';
import Image from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import Home from '../Screens/Home/Home';
import CreateTweet from '../Screens/CreateTweet/CreateTweet';
import Camera from '../Screens/Camera/Camera';
import KweekExtendedView from '../Screens/KweekExtendedView/KweekExtendedView';
import ProfileStackNavigator from './ProfileStackNavigator';
import FollowerList from '../Screens/FollowerList/FollowersList';
import FollowingList from '../Screens/FollowingList/FollowingList';
import Rekweekers from '../Screens/Rekweekers/Rekweekers';
import Likers from '../Screens/Likers/Likers';

const HomeStackNavigator = createStackNavigator({

  Homes: {
    screen: Home,
    navigationOptions: {
      title: 'Home',
    }
  },
  KweekExtendedView: {
    screen: KweekExtendedView,
    navigationOptions: {
      title: 'Kweek',
    },
  },

  Profile: { screen: ProfileStackNavigator,
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
  Rekweekers: { screen: Rekweekers,
    navigationOptions: {
      header: null,
    }, },
  Likers: { screen: Likers,
    navigationOptions: {
      header: null,
    }, },
  CreateTweet: { screen: CreateTweet },
  Camera: { screen: Camera },
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
