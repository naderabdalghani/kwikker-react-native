import React from 'react';
import { createBottomTabNavigator, createAppContainer } from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Octicons from 'react-native-vector-icons/Octicons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import HomeStackNavigator from './HomeStackNavigator';
import SearchStackNavigator from './SearchStackNavigator';
import NotificationsStackNavigator from './NotificationsStackNavigator';
import MessagesStackNavigator from './MessagesStackNavigator';

const TabNavigator = createBottomTabNavigator({

  Home: { screen: HomeStackNavigator },
  Search: { screen: SearchStackNavigator },
  Notifications: { screen: NotificationsStackNavigator },
  Messages: { screen: MessagesStackNavigator }
},
{
  defaultNavigationOptions: ({ navigation }) => ({
    tabBarIcon: ({ focused, tintColor }) => {
      const { routeName } = navigation.state;

      switch (routeName) {
        case 'Home':
          return <Octicons name="home" size={30} color={focused ? 'rgb(29, 161, 242)' : 'rgb(136, 153, 166)'} />;

        case 'Search':
          return <EvilIcons name="search" size={35} color={focused ? 'rgb(29, 161, 242)' : 'rgb(136, 153, 166)'} />;

        case 'Notifications':
          return (
            <Ionicons
              name="ios-notifications-outline"
              size={30}
              style={{ color: focused ? 'rgb(29, 161, 242)' : 'rgb(136, 153, 166)' }}
            />
          );

        case 'Messages':
          return (
            <FontAwesome
              name="envelope-o"
              size={26}
              style={{ color: focused ? 'rgb(29, 161, 242)' : 'rgb(136, 153, 166)' }}
            />
          );
        default:
          return (
            <FontAwesome
              name="envelope-o"
              size={26}
              style={{ color: focused ? 'rgb(29, 161, 242)' : 'rgb(136, 153, 166)' }}
            />
          );
      }
    },
  }),

  animationEnabled: true,
  tabBarOptions: {
    showIcon: true,
    showLabel: false,
    showIndicator: false,
    titleStyle: {
      justifyContent: 'center',
      alignItems: 'center',
    },
  },
});


export default createAppContainer(TabNavigator);