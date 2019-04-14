import React, { Component } from 'react';
import { View } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import { InAppNotificationProvider } from './App/Components/react-native-in-app-notification/src/index';
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
