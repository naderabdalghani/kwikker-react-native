import React, { Component } from 'react';
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
