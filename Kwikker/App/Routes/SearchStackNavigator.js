import React, { Component } from 'react';
import { createStackNavigator, CreateAppContainer } from 'react-navigation';
import Search from '../Screens/Search/Search';

const SearchStackNavigator = createStackNavigator({

  Search: { screen: Search }
});
export default SearchStackNavigator;