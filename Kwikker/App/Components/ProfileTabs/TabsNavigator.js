
import React from 'react';
import { Text, View } from 'react-native';
import {  createAppContainer, createMaterialTopTabNavigator } from 'react-navigation';

import Kweeks from './Kweeks'
import KweeksReplies from './KweeksReplies'
import Media from './Media'
import Likes from './Likes'


const TabsNavigator = createMaterialTopTabNavigator({
  Kweeks:{screen:Kweeks},
  KweeksReplies:{screen:KweeksReplies},
  Media:{screen:Media},
  Likes:{screen:Likes}
},{
  tabBarOptions: {
  labelStyle: {
    fontSize: 12,
    
  },
  tabStyle: {
    width: 100,
  },
  style: {
    backgroundColor: 'gray',
  },
}
});

export default createAppContainer(TabsNavigator);
