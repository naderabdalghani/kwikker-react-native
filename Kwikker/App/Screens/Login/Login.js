import React, { Component } from 'react';
import { Text, View, Button } from 'react-native';

export default class Login extends Component
{

  constructor(props) {
    super(props);
  }

  login()
  {
    this.props.navigation.navigate('DrawerNavigator')
  }

  render() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>Login!</Text>
          <Button
            title="Login"
            onPress={this.login.bind(this)}
          />
        </View>
    );
  }
}

