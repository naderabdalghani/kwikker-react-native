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
      color: 'gray'
    },
    tabStyle: {
    },
    style: {
      backgroundColor: 'white',
      color: 'blue'

    },
  }
});

export default createAppContainer(SearchTapNavigator);