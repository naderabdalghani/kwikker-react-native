import React, { Component } from 'react';
import { View } from 'react-native';
import { InAppNotificationProvider } from 'react-native-in-app-notification';
import SplashScreen from 'react-native-splash-screen';
import SwitchNavigator from './App/Routes/SwitchNavigator';

class App extends Component {
  constructor(props) {
    super(props);
  }

state = { nightMode: false };


componentDidMount() {
  SplashScreen.hide();
}

render() {
  return (
    <InAppNotificationProvider>
      <SwitchNavigator />
    </InAppNotificationProvider>
  );
}
}
export default App;
