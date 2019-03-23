import React, { Component } from 'react';
import { Text, View, Image, Button, TouchableNativeFeedback } from 'react-native';
import styles from './Styles';
import CustomButton from '../../Components/CustomButton/CustomButton';


export default class StartScreen extends Component {
  /**
   * Redirects the user to the login form
   */
  logIn() {
    this.props.navigation.push('Login');
  }

  /**
   * Redirects the user to the signing up form
   */
  signUp() {
    this.props.navigation.push('Signup');
  }

  render() {
    const { parentView, header, headerImage, startScreenText, textButtonContainer, logInContainer, logInText, logInButton } = styles;
    return (
      <View style={parentView}>
        <View style={header}>
          <Image
            style={headerImage}
            source={require('./../../Assets/Images/Twitter_Logo_Blue.png')}
          />
        </View>
        <View style={textButtonContainer}>
          <Text style={startScreenText}>See what's happening in the world right now.</Text>
          <CustomButton
            onPress={this.signUp.bind(this)} marginSize={90} customFontSize={25}
          >Create account
          </CustomButton>
        </View>
        <View style={logInContainer}>
          <Text style={logInText}>Have an account already?</Text>
          <TouchableNativeFeedback
            onPress={this.logIn.bind(this)}
          >
            <Text style={logInButton}> Log in</Text>
          </TouchableNativeFeedback>
        </View>
      </View>
    );
  }
}
