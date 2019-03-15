import React, { Component } from 'react';
import Settings from './../Screens/Settings/Settings';
import { createStackNavigator, createAppContainer } from 'react-navigation'

const SettingsStackNavigator = createStackNavigator({

    Settings: { screen: Settings }
});
export default SettingsStackNavigator