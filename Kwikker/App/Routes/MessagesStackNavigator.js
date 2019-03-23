import React, { Component } from 'react';
import { createStackNavigator, CreateAppContainer } from 'react-navigation';
import Messages from '../Screens/Messages/Messages';

const MessagesStackNavigator = createStackNavigator({

  Messaages: {
    screen: Messages,
    navigationOptions: {
      title: 'Messages'
    }
  }
});
export default MessagesStackNavigator;