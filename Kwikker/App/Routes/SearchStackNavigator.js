import React, { Component } from 'react';
import { createStackNavigator, CreateAppContainer } from 'react-navigation';
import Search from '../Screens/Search/Search';
import SearchBar from '../Screens/SearchBar/SearchBar';


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
  SearchBar: { screen: SearchBar,
    navigationOptions: {
      headerStyle: {
        backgroundColor: 'transparent'
      },
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