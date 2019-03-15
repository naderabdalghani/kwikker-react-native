import React, { Component } from 'react';
import { Text, View, Button } from 'react-native';

export default class StartScreen extends Component
{

  constructor(props) {
    super(props);
  }

  login()
  {
    this.props.navigation.push('Login')
  }

  signup()
  {
    this.props.navigation.push('Signup')
  }

  render() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>StartScreen!</Text>
          <Button
            title="Login"
            onPress={this.login.bind(this)}
          />
          <Button
            title="Signup"
            onPress={this.signup.bind(this)}
          />
        </View>
    );
  }
}

