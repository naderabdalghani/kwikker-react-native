import React, { Component } from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import Account from '../Screens/Account/Account';
import Username from '../Screens/Username/Username';
import StartScreen from '../Screens/StartScreen/StartScreen';
import Email from '../Screens/Email/Email';
import Password from '../Screens/Password/Password';

const AccountNavigator = createStackNavigator({

  Account: { screen: Account,
    navigationOptions: {
      header: null,
    }, },
  Username: { screen: Username,
    navigationOptions: {
      header: null,
    }, },
  Password: { screen: Password,
    navigationOptions: {
      header: null,
    }, },
  Email: { screen: Email,
    navigationOptions: {
      header: null,
    }, },
  StartScreen: {
    screen: StartScreen,
    navigationOptions: {
      header: null,
    },
  },
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