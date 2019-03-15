import React, { Component } from 'react';
import ProfileStackNavigator from './ProfileStackNavigator';
import TabNavigator from './TabNavigator';
import SettingsStackNavigator from './SettingsStackNavigator';
import { createDrawerNavigator, createAppContainer } from 'react-navigation'

const DrawerNavigator = createDrawerNavigator({

    Home: { screen: TabNavigator},
    Profile: { screen: ProfileStackNavigator },
    Settings: { screen: SettingsStackNavigator}
});

export default createAppContainer(DrawerNavigator);