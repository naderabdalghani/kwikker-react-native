import React, { Component } from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import Account from '../Screens/Account/Account';
import Username from '../Screens/Username/Username';
import Email from '../Screens/Email/Email';
import Password from '../Screens/Password/Password';

const AccountNavigator = createStackNavigator({

  Account: { screen: Account,
    navigationOptions: {
      header: null,
    }, },
  Username: { screen: Username },
  Password: { screen: Password },
  Email: { screen: Email },
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