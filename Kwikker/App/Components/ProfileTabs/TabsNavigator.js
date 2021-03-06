
import React from 'react';
import { Text, View } from 'react-native';
import { createAppContainer, createMaterialTopTabNavigator } from 'react-navigation';
import Kweeks from './Kweeks';
import KweeksReplies from './KweeksReplies';
import Media from './Media';
import Likes from './Likes';


const TabsNavigator = createMaterialTopTabNavigator({
  Kweeks: { screen: Kweeks },
  Replies: { screen: KweeksReplies },
  Media: { screen: Media },
  Likes: { screen: Likes }
}, {
  tabBarOptions: {
    upperCaseLabel: false,
    labelStyle: {
      fontSize: 14,
      color: '#1DA1F2',
      fontWeight: 'bold',
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

export default createAppContainer(TabsNavigator);
