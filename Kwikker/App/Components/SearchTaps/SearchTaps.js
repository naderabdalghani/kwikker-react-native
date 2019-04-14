import React from 'react';
import { Text, View } from 'react-native';
import { createAppContainer, createMaterialTopTabNavigator } from 'react-navigation';
import Kweeks from './Kweeks';
import People from './People';


const SearchTapNavigator = createMaterialTopTabNavigator({
  People: { screen: People },
  Kweeks: { screen: Kweeks },
}, {
  tabBarOptions: {
    upperCaseLabel: false,
    labelStyle: {
      fontSize: 12,
      color: '#1DA1F2'
    },
    tabStyle: {
    },
    tabBarStyle: {
      backgroundColor: '#eeeeee',
    },
    indicatorStyle: {
      backgroundColor: '#1DA1F2'
    },
    style: {
      backgroundColor: 'white',

    },
  }
});

export default createAppContainer(SearchTapNavigator);