import React, { Component } from 'react';
import { createStackNavigator, CreateAppContainer } from 'react-navigation';
import Search from '../Screens/Search/Search';

const SearchStackNavigator = createStackNavigator({
  Search: { screen: Search,
    navigationOptions: {
      headerStyle: {
        backgroundColor: 'transparent'
      },
      headerTitleStyle: {
        fontWeight: 'bold',
        color: '#fff',
        zIndex: 1,
        fontSize: 18,
        lineHeight: 23,
        fontFamily: 'CircularStd-Bold'
      },
      headerTintColor: '#fff'
    }
  },
});
SearchStackNavigator.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;
  if (navigation.state.index > 0) {
    tabBarVisible = false;
  }

  return {
    tabBarVisible,
  };
};
export default SearchStackNavigator;