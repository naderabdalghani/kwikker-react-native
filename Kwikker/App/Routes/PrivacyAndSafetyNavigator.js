import React, { Component } from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import PrivacyAndSafety from '../Screens/PrivacyAndSafety/PrivacyAndSafety';
import BlockedAccounts from '../Screens/BlockedAccounts/BlockedAccounts';
import MutedAccounts from '../Screens/MutedAccounts/MutedAccounts';

const PrivacyAndSafetyNavigator = createStackNavigator({

  PrivacyAndSafety: { screen: PrivacyAndSafety,
    navigationOptions: {
      header: null,
    }, },

  BlockedAccounts: { screen: BlockedAccounts,
    navigationOptions: {
      header: null,
    }, },

  MutedAccounts: { screen: MutedAccounts,
    navigationOptions: {
      header: null,
    }, },
});
PrivacyAndSafetyNavigator.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;
  if (navigation.state.index > 0) {
    tabBarVisible = false;
  }

  return {
    tabBarVisible,
  };
};
export default PrivacyAndSafetyNavigator;