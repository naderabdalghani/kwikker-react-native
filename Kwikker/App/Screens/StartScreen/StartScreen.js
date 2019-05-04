import React, { Component } from 'react';
import { Text, View, Image, TouchableNativeFeedback, Linking, Platform, ToastAndroid } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { NavigationActions, StackActions } from 'react-navigation';
import axios from 'axios';
import styles from './Styles';
import CustomButton from '../../Components/CustomButton/CustomButton';
import Loader from '../../Components/Loader/Loader';

/** @module StartScreen **/

export default class StartScreen extends Component {
  state = { loading: false, blank: true };

  async componentDidMount() {
    await AsyncStorage.getItem('@app:session').then((token) => {
      if (token) {
        axios.defaults.headers.common['TOKEN'] = token;
        this.props.navigation.navigate('Home');
      }
    }).catch((error) => {});
    this.setState({ blank: false });
    if (Platform.OS === 'android') {
      Linking.getInitialURL().then((url) => {
        if (url && global.deepLinking) {
          global.deepLinking = false;
          if (url.includes('kwikker.me/confirm')) {
            this.confirmUser(url);
          } else if (url.includes('kwikker.me/reset_password')) {
            this.resetPassword(url);
          }
        }
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
   * Confirms the user who has clicked on a confirmation link. Displays a success message if the confirmation was successful, otherwise,
   * it displays an error message
   * @memberof StartScreen
   */
  confirmUser = (url) => {
    const confirmationCode = url.replace('http://kwikker.me/confirm/', '');
    this.setState({
      loading: true,
    });
    axios.post('account/registration/confirmation', {}, {
      headers: {
        CODE: confirmationCode
      }
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
   * Specifies temporary header config defaults then redirects the user to the 'Update password' form
   * @memberof StartScreen
   */
  resetPassword = (url) => {
    this.setState({
      loading: true,
    });
    const code = url.replace('http://kwikker.me/reset_password/', '');
    this.props.navigation.navigate('Password', { forgotPassword: true, resetCode: code });
  }

  /**
   * Handles opening a kwikker URL in iOS
   * @memberof StartScreen
   */
  handleOpenURL = (event) => {
    this.confirmUser(event.url);
  }

  /**
   * Redirects the user to the login form
   * @memberof StartScreen
   */
  logIn() {
    this.props.navigation.push('Login');
  }

  /**
   * Redirects the user to the signing up form
   * @memberof StartScreen
   */
  signUp() {
    this.props.navigation.push('Signup');
  }

  render() {
    const {
      parentView,
      header,
      headerImage,
      startScreenText,
      textButtonContainer,
      logInContainer,
      logInText,
      logInButton
    } = styles;
    if (this.state.blank) return (null);

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
            onPress={this.signUp.bind(this)} marginSize="22.5%" customFontSize={25}
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
