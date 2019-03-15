import React from 'react';
import HomeStackNavigator from './HomeStackNavigator';
import SearchStackNavigator from './SearchStackNavigator';
import NotificationsStackNavigator from './NotificationsStackNavigator';
import MessagesStackNavigator from './MessagesStackNavigator';
import { createBottomTabNavigator, createAppContainer } from 'react-navigation';

const TabNavigator = createBottomTabNavigator({

    Home: { screen: HomeStackNavigator },
    Search: { screen: SearchStackNavigator },
    Notifications: { screen: NotificationsStackNavigator },
    Messages: { screen: MessagesStackNavigator }
});

export default createAppContainer(TabNavigator);