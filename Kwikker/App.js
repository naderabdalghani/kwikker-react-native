import React, { Component } from 'react';
import SplashScreen from 'react-native-splash-screen';
import SwitchNavigator from './App/Routes/SwitchNavigator';

class App extends Component {
constructor(props)
{
  super(props)
}
state = { nightMode: false };



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
