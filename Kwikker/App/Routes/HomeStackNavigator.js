import React, { Component } from 'react';
import Home from './../Screens/Home/Home';
import { createStackNavigator, CreateAppContainer } from 'react-navigation';
import Image from 'react-native'

const HomeStackNavigator = createStackNavigator({

    Homes: {
        screen: Home,
        navigationOptions: {
            title: 'Home',
        }
    }
});
export default HomeStackNavigator
