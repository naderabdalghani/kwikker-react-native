import React, { Component } from 'react';
import { Text, View, Button, Image, TouchableNativeFeedback, ToastAndroid } from 'react-native';
import axios from 'axios';
import * as Keychain from 'react-native-keychain';
import styles from './Styles';
import CustomTextInput from '../../Components/CustomTextInput/CustomTextInput';
import Section from '../../Components/Section/Section';
import CustomButton from '../../Components/CustomButton/CustomButton';
import Loader from '../../Components/Loader/Loader';

export default class Login extends Component {
  state = { username: '', password: '', loading: false, error: '' };


  onLoginFail() {
    this.setState({ error: 'Authentication Failed', loading: false });
    ToastAndroid.show(this.state.error, ToastAndroid.SHORT);
  }

  onLoginSuccess() {
    this.props.navigation.navigate('DrawerNavigator');
  }

  signUp() {
    this.props.navigation.push('Signup');
  }

  logInButtonPress() {
    this.setState({
      loading: true,
      error: ''
    });
    axios.post('/account/login', {
      username: this.state.username,
      password: this.state.password
    })
      .then((res) => {
        Keychain.setGenericPassword('session', res.data.token);
        Keychain.getGenericPassword.then((creds) => creds.password).then((token) => {
          axios.defaults.headers.common['Authorization'] = token;
        });
        this.onLoginSuccess.bind(this);
      })
      .catch((err) => {
        this.onLoginFail.bind(this);
      });
  }

  forgotPassword() {
    this.props.navigation.push('ForgotPassword');
  }

  render() {
    const { parentView, header, dummyElement, imageContainer, headerImage, signUpButton, logInText, logInButtonStyle, loginButtonContainer, loginButtonBorder, forgotPasswordStyle } = styles;
    const buttonDisabled = (this.state.emailOrUsername === '') || (this.state.password === '');
    return (
      <View style={parentView}>
        <Loader loading={this.state.loading} />
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
            autoFocus
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
        <Text style={forgotPasswordStyle} onPress={this.forgotPassword.bind(this)}>Forgot password?</Text>
        <View style={loginButtonContainer}>
          <View style={loginButtonBorder}>
            <View style={logInButtonStyle}>
              <CustomButton onPress={this.logInButtonPress.bind(this)} marginSize={15} customFontSize={17} disabled={buttonDisabled}>Log in</CustomButton>
            </View>
          </View>
        </View>
      </View>
    );
  }
}
