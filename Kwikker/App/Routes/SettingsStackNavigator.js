import React, { Component } from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import Settings from '../Screens/Settings/Settings';

const SettingsStackNavigator = createStackNavigator({

  Settings: { screen: Settings,
    navigationOptions: {
      title: 'About Kwikker',
    }
  }
});
export default SettingsStackNavigator;