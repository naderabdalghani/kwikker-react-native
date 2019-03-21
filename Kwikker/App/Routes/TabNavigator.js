import React from 'react';
import HomeStackNavigator from './HomeStackNavigator';
import SearchStackNavigator from './SearchStackNavigator';
import NotificationsStackNavigator from './NotificationsStackNavigator';
import MessagesStackNavigator from './MessagesStackNavigator';
import { createBottomTabNavigator, createAppContainer } from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Octicons from 'react-native-vector-icons/Octicons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import FontAwesome from 'react-native-vector-icons/EvilIcons';

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
        
        switch (routeName){
  
          case "Home":
            return <Octicons name={'home'} size={30} color={ focused ? 'rgb(29, 161, 242)':'rgb(136, 153, 166)'} />
          
          case "Search":
            return <EvilIcons name={'search'} size={35} color={ focused ?  'rgb(29, 161, 242)':'rgb(136, 153, 166)'} />
          
          case "Notifications":
            return <Ionicons
                    name={'ios-notifications-outline'}
                    size={30}
                    style={{ color: focused ?  'rgb(29, 161, 242)':'rgb(136, 153, 166)' }}
                  />
          
          case "Messages":
            return <FontAwesome
                    name={'envelope'}
                    size={26}
                    style={{ color: focused ? 'rgb(29, 161, 242)':'rgb(136, 153, 166)' }}
                  />
          
        }
      },
    }),
    //tabBarPosition: 'bottom',
    //tabBarComponent: (props) => <CustomTabComponent {...props}/>,
    animationEnabled: true,
    tabBarOptions: {
      showIcon: true,
      showLabel:false,
      showIndicator:false,
      titleStyle: {
          justifyContent: 'center',
          alignItems: 'center',
      },
      /*style: {
          borderWidth: 0,
          position:'absolute',
          bottom:0,
          left:0,
          width:'100%',
          backgroundColor: 'rgb(27, 42, 51)',
          borderColor: 'rgb(27, 42, 51)',
          shadowColor:'red',
          elevation:2
      },
      activeBackgroundColor: 'rgb(0, 79, 114)',
      inactiveBackgroundColor: 'rgb(27, 42, 51)',
      labelStyle: {
          fontSize: 14,
          color: '#fff',
          position: 'relative',
          alignSelf: 'center',
  
      },
      iconStyle:{
        marginBottom:5,
        marginTop:5
      },
      tabStyle: {
          justifyContent: 'center',
          alignItems: 'center',
          
      },
      indicatorStyle: {
        backgroundColor: 'transparent',
    },*/
  },
    
});

export default createAppContainer(TabNavigator);