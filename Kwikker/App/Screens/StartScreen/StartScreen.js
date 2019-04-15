import React, { Component } from 'react';
import { Text, View, Image, Button, TouchableNativeFeedback, Linking, Platform, ToastAndroid } from 'react-native';
import axios from 'axios';
import styles from './Styles';
import CustomButton from '../../Components/CustomButton/CustomButton';
import Loader from '../../Components/Loader/Loader';

export default class StartScreen extends Component {
  state = { loading: false };

  componentDidMount() {
    if (Platform.OS === 'android') {
      Linking.getInitialURL().then((url) => {
        this.confirmUser(url);
      })
        .catch((err) => {
        });
    } else {
      Linking.addEventListener('url', this.handleOpenURL);
    }
  }

  componentWillUnmount() {
    Linking.removeEventListener('url', this.handleOpenURL);
  }

  /**
   *
   */
  confirmUser = (url) => {
    const confirmationCode = url.replace('http://kwikker.me/confirm/', '');
    this.setState({
      loading: true,
    });
    axios.post('account/registration/confirmation', {
      confirmation_code: confirmationCode
    })
      .then((res) => {
        this.setState({
          loading: false,
        });
        ToastAndroid.show('Confirmation successful', ToastAndroid.LONG);
        this.props.navigation.push('Login');
      })
      .catch((err) => {
        this.setState({
          loading: false,
        });
        ToastAndroid.show('Confirmation failed, please try again', ToastAndroid.LONG);
      });
  }

  /**
   *
   */
  handleOpenURL = (event) => {
    this.confirmUser(event.url);
  }

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
        <Loader loading={this.state.loading} loadingMessage="Loading" />
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
