import React, { Component } from 'react';
import { createStackNavigator, CreateAppContainer } from 'react-navigation';
import FollowerList from '../Screens/FollowerList/FollowersList';

const FollowersListNavigator = createStackNavigator({

  FollowerList: { screen: FollowerList,
    navigationOptions: {
      title: 'Followers',
    }
  }
});
export default FollowersListNavigator;