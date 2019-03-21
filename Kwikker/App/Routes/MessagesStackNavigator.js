import React, { Component } from 'react';
import Messages from './../Screens/Messages/Messages'
import { createStackNavigator, CreateAppContainer } from 'react-navigation'

const MessagesStackNavigator = createStackNavigator({

    Messaages: {
        screen: Messages,
        navigationOptions: {
            title: 'Messages'
        } 
    }
});
export default MessagesStackNavigator