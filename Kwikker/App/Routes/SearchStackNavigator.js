import React, { Component } from 'react';
import Search from './../Screens/Search/Search'
import { createStackNavigator, CreateAppContainer } from 'react-navigation'

const SearchStackNavigator = createStackNavigator({

    Search: { screen: Search }
});
export default SearchStackNavigator