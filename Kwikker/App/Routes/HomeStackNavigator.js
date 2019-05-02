import React, { Component } from 'react';
import { createStackNavigator, CreateAppContainer } from 'react-navigation';
import Image from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import Home from '../Screens/Home/Home';
import CreateTweet from '../Screens/CreateTweet/CreateTweet';
import Camera from '../Screens/Camera/Camera';
import KweekExtendedView from '../Screens/KweekExtendedView/KweekExtendedView'

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
    }
  },
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
