import React, { Component } from 'react';
import { createDrawerNavigator, createAppContainer } from 'react-navigation';
import ProfileStackNavigator from './ProfileStackNavigator';
import TabNavigator from './TabNavigator';
import SettingsStackNavigator from './SettingsStackNavigator';
import DrawerNavContainer from '../Screens/DrawerNavContainer/DrawerNavContainer';

const DrawerNavigator = createDrawerNavigator({

  Home: { screen: TabNavigator },
  Profile: { screen: ProfileStackNavigator,
    navigationOptions: {
      header: null,
    }, },
  Settings: { screen: SettingsStackNavigator,
    navigationOptions: {
      header: null,
    }, },
},
{
  contentComponent: ({ navigation }) => <DrawerNavContainer navigation={navigation} />
});

export default createAppContainer(DrawerNavigator);