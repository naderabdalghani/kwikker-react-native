import React, { Component } from 'react';
import { createStackNavigator, CreateAppContainer } from 'react-navigation';
import Messages from '../Screens/Messages/Messages';
import ConversationScreen from '../Screens/ConversationScreen/ConversationScreen';
import ConversationSearch from '../Screens/ConversationSearch/ConversationSearch';
import ProfileStackNavigator from './ProfileStackNavigator';
import FollowerList from '../Screens/FollowerList/FollowersList';
import FollowingList from '../Screens/FollowingList/FollowingList';

const MessagesStackNavigator = createStackNavigator({

  Messaages: {
    screen: Messages,
    navigationOptions: {
      title: 'Messages'
    }
  },
  ConversationSearch: { screen: ConversationSearch },
  ConversationScreen: { screen: ConversationScreen },
  FollowerList: { screen: FollowerList,
    navigationOptions: {
      header: null,
    }, },
  FollowingList: { screen: FollowingList,
    navigationOptions: {
      header: null,
    }, },
  Profile: { screen: ProfileStackNavigator,
    navigationOptions: {
      header: null,
    }, },
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