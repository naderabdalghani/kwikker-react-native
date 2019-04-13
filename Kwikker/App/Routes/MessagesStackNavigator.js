import React, { Component } from 'react';
import { createStackNavigator, CreateAppContainer } from 'react-navigation';
import Messages from '../Screens/Messages/Messages';
import ConversationScreen from '../Screens/ConversationScreen/ConversationScreen';
import ConversationSearch from '../Screens/ConversationSearch/ConversationSearch';

const MessagesStackNavigator = createStackNavigator({

  Messaages: {
    screen: Messages,
    navigationOptions: {
      title: 'Messages'
    }
  },

  ConversationScreen: { screen: ConversationScreen },
  ConversationSearch: { screen: ConversationSearch }
});
MessagesStackNavigator.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;
  if (navigation.state.index > 0) {
    tabBarVisible = false;
  }

  return {
    tabBarVisible,
  };
};
export default MessagesStackNavigator;