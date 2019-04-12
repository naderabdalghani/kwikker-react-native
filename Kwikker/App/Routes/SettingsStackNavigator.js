import React, { Component } from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import Settings from '../Screens/Settings/Settings';
import Account from './ِAccountNavigator';
import PrivacyAndSafety from './PrivacyAndSafetyNavigator';

const SettingsStackNavigator = createStackNavigator({

  Settings: { screen: Settings,
    navigationOptions: {
      title: 'Settings',
    } },
  Account: { screen: Account },
  PrivacyAndSafety: { screen: PrivacyAndSafety }
});
SettingsStackNavigator.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;
  if (navigation.state.index > 0) {
    tabBarVisible = false;
  }

  return {
    tabBarVisible,
  };
};
export default SettingsStackNavigator;