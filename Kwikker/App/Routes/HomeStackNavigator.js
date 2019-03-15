import React, { Component } from 'react';
import Home from './../Screens/Home/Home';
import { createStackNavigator, CreateAppContainer } from 'react-navigation';


const HomeStackNavigator = createStackNavigator({

    Homes: { screen: Home }
});
export default HomeStackNavigator
