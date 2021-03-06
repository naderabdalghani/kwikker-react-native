import React, { Component } from 'react';
import { Text, View, Button, Image, ToastAndroid, TouchableNativeFeedback } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import styles from './Styles';
import CustomTextInput from '../../Components/CustomTextInput/CustomTextInput';
import CustomButton from '../../Components/CustomButton/CustomButton';
import Loader from '../../Components/Loader/Loader';

const { messageStyle, resendButton } = styles;

/** @module Login **/

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { email: '', username: '', password: '', loading: false, message: '' };
    this.resendButtonPress = this.resendButtonPress.bind(this);
  }

  /**
   * Shows a toast message "Authentication Failed" and turns off the loading screen
   * @memberof Login
   * @param  {JSON} error - Error json object
   */
  onLoginFail(error) {
    const statusCode = error.response.status;
    if (statusCode === 403) {
      this.setState({ message: 'User exists but not confirmed, please confirm your account.', loading: false });
    } else if (statusCode === 404) {
      this.setState({ message: 'A user with matching credentials does not exist.', loading: false });
      ToastAndroid.show(this.state.message, ToastAndroid.SHORT);
    } else {
      this.setState({ message: 'Authentication failed due to a network error, try again later', loading: false });
      ToastAndroid.show(this.state.message, ToastAndroid.SHORT);
    }
  }

  /**
   * Specifies header config defaults that will be applied to every request and redirects the user to the Home screen
   * @memberof Login
   */
  onLoginSuccess() {
    AsyncStorage.getItem('@app:session').then((token) => {
      axios.defaults.headers.common['TOKEN'] = token;
    }).catch((error) => {
    }).then(() => {
      this.props.navigation.navigate('Home');
    });
  }

  /**
  * Redirects the user to the signing up form
   * @memberof Login
  */
  signUp() {
    this.props.navigation.push('Signup');
  }

  /**
  * Processes the user's credentials and either calls {@link #onloginsuccess|onLoginSuccess} or calls {@link #onloginfail|onLoginFail}
   * @memberof Login
  */
  logInButtonPress() {
    this.setState({
      loading: true,
      message: ''
    });
    axios.post('account/login', {
      username: this.state.username,
      password: this.state.password
    })
      .then((res) => {
        AsyncStorage.multiSet([['@app:session', res.data.token], ['@app:id', this.state.username]])
          .catch((error) => {})
          .then(() => {
            return this.onLoginSuccess();
          });
      })
      .catch((err) => {
        let error = JSON.stringify(err);
        error = JSON.parse(error);
        return this.onLoginFail(error);
      });
    // this.onLoginSuccess(); // THIS SHOULD BE REMOVED AND THE ABOVE CODE SECTION GETS UNCOMMENTED
  }

  /**
  * Redirects the user to the 'forgot password' form
   * @memberof Login
  */
  forgotPassword() {
    this.props.navigation.push('ForgotPassword');
  }

  /**
   * Sends a user's email then either displays a success message upon sending a new confirmation email or displays an error otherwise
   * @memberof Login
   */
  resendButtonPress() {
    this.setState({
      loading: true,
      message: ''
    });
    axios.post('/account/registration/resend_email', {
      email: this.state.email
    })
      .then((res) => {
        this.setState({
          loading: false,
          message: 'Confirmation email resent successfully'
        });
        ToastAndroid.show(this.state.message, ToastAndroid.SHORT);
      })
      .catch((err) => {
        this.setState({
          loading: false,
          message: 'Failed to resent confirmation email'
        });
        ToastAndroid.show(this.state.message, ToastAndroid.SHORT);
      });
  }

  /**
   * Renders a 'resend' button if an unconfirmed user tries to login
   * @memberof Login
   */
  renderResendMessage() {
    let resendBtn;

    if (this.state.email !== '') {
      resendBtn = (
        <TouchableNativeFeedback onPress={this.resendButtonPress}>
          <Text style={resendButton}> Resend confirmation email</Text>
        </TouchableNativeFeedback>
      );
    } else {
      resendBtn = (
        <TouchableNativeFeedback>
          <Text style={{ ...resendButton, color: '#AAB8C2' }}> Resend confirmation email</Text>
        </TouchableNativeFeedback>
      );
    }
    if (this.state.message === 'User exists but not confirmed, please confirm your account.') {
      return (
        <View>
          <CustomTextInput
            placeholder=""
            label="Email"
            secureTextEntry={false}
            value={this.state.email}
            onChangeText={(email) => this.setState({ email })}
            autoFocus
            autoCapitalize="none"
          />
          <View>
            <Text style={messageStyle}>{this.state.message}</Text>
            {resendBtn}
          </View>
        </View>
      );
    }
    return (null);
  }

  render() {
    const { parentView, header, dummyElement, imageContainer, headerImage, signUpButton, logInText, logInButtonStyle, loginButtonContainer, loginButtonBorder, forgotPasswordStyle } = styles;
    const buttonDisabled = (this.state.username === '') || (this.state.password === '');
    return (
      <View style={parentView}>
        <Loader loading={this.state.loading} loadingMessage="Logging In" />
        <View style={header}>
          <View style={dummyElement} />
          <View style={imageContainer}>
            <Image
              style={headerImage}
              source={require('./../../Assets/Images/Twitter_Logo_Blue.png')}
            />
          </View>
          <Text style={signUpButton} onPress={this.signUp.bind(this)}>Sign up</Text>
        </View>

        <Text style={logInText}>Log in to Twitter.</Text>

        <View>
          <CustomTextInput
            placeholder=""
            label="Username"
            secureTextEntry={false}
            value={this.state.username}
            onChangeText={(username) => this.setState({ username })}
            autoFocus={false}
            autoCapitalize="none"
          />
          <CustomTextInput
            placeholder=""
            label="Password"
            secureTextEntry
            value={this.state.password}
            onChangeText={(password) => this.setState({ password })}
            autoFocus={false}
          />
        </View>
        {this.renderResendMessage()}
        <Text style={forgotPasswordStyle} onPress={this.forgotPassword.bind(this)}>Forgot password?</Text>
        <View style={loginButtonContainer}>
          <View style={loginButtonBorder}>
            <View style={logInButtonStyle}>
              <CustomButton onPress={this.logInButtonPress.bind(this)} marginSize="3.75%" customFontSize={17} disabled={buttonDisabled}>Log in</CustomButton>
            </View>
          </View>
        </View>
      </View>
    );
  }
}
