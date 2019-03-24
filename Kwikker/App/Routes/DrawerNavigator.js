import React, { Component } from 'react';
import { createDrawerNavigator, createAppContainer } from 'react-navigation';
import ProfileStackNavigator from './ProfileStackNavigator';
import TabNavigator from './TabNavigator';
import SettingsStackNavigator from './SettingsStackNavigator';
import DrawerNavContainer from '../Screens/DrawerNavContainer/DrawerNavContainer';

const DrawerNavigator = createDrawerNavigator({

  Home: { screen: TabNavigator },
  Profile: { screen: ProfileStackNavigator },
  Settings: { screen: SettingsStackNavigator },
},
{
  contentComponent: ({ navigation }) => <DrawerNavContainer navigation={navigation} />
});

export default createAppContainer(DrawerNavigator);