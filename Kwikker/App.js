/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import {
  StatusBar,
  View
} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import SwitchNavigator from './App/Routes/SwitchNavigator';

class App extends Component {
  componentDidMount() {
    SplashScreen.hide();
  }

  render() {
    return (
      <SwitchNavigator />
    );
  }
}
export default App;
