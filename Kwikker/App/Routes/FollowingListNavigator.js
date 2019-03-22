import React, { Component } from 'react';
import { createStackNavigator, CreateAppContainer } from 'react-navigation';
import FollowingList from '../Screens/FollowingList/FollowingList';

const FollowingListNavigator = createStackNavigator({

  FollowingList: { screen: FollowingList,
    navigationOptions: {
      title: 'Following',
    }
  }
});
export default FollowingListNavigator;