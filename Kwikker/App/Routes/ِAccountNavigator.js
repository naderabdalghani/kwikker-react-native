import React, { Component } from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import Account from '../Screens/Account/Account';

const AccountNavigator = createStackNavigator({

  Account: { screen: Account }
});
AccountNavigator.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;
  if (navigation.state.index > 0) {
    tabBarVisible = false;
  }

  return {
    tabBarVisible,
  };
};
export default AccountNavigator;