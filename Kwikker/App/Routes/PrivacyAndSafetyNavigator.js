import React, { Component } from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import PrivacyAndSafety from '../Screens/PrivacyAndSafety/PrivacyAndSafety';

const PrivacyAndSafetyNavigator = createStackNavigator({

  PrivacyAndSafety: { screen: PrivacyAndSafety,
    navigationOptions: {
      header: null,
    }, }
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