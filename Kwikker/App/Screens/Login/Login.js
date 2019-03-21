import React, { Component } from 'react';
import { Text, View, Button, Spinner, Image, TouchableNativeFeedback } from 'react-native';
import axios from 'axios';
import styles from './Styles';
import CustomTextInput from '../../Components/CustomTextInput/CustomTextInput';
import Section from '../../Components/Section/Section';
import CustomButton from '../../Components/CustomButton/CustomButton';

export default class Login extends Component {
  state = { emailOrUsername: '', password: '', error: '', loading: false };

  onButtonPress() {
  }

  onLoginFail() {
  }

  onLoginSuccess() {
  }

  signUp() {
    this.props.navigation.push('Signup');
  }

  logIn() {
    axios.post('/profile', {
      name: 'test5'
    })
      .then(
        (response) => {
          console.log(response);
        }
      )
      .catch((error) => {
        console.log(error);
      });
    this.props.navigation.navigate('DrawerNavigator');
  }

  forgotPassword() {
    this.props.navigation.push('ForgotPassword');
  }

  renderButton() {
    if (this.state.loading) {
      return <Spinner size="small" />;
    }

    return (
      <Button
        onPress={this.onButtonPress.bind(this)}
        title="Login"
      />
    );
  }

  render() {
    const { ParentView, Header, DummyElement, ImageContainer, HeaderImage, SignUpButton, LogInText, LogInButtonStyle, LoginButtonContainer, LoginButtonBorder, ForgotPasswordStyle } = styles;
    return (
      <View style={ParentView}>
        <View style={Header}>
          <View style={DummyElement} />
          <View style={ImageContainer}>
            <Image
              style={HeaderImage}
              source={require('./../../Assets/Images/Twitter_Logo_Blue.png')}
            />
          </View>
          <Text style={SignUpButton} onPress={this.signUp.bind(this)}>Sign up</Text>
        </View>

        <Text style={LogInText}>Log in to Twitter.</Text>

        <View>
          <CustomTextInput
            placeholder=""
            label="Email or username"
            secureTextEntry={false}
            value={this.state.emailOrUsername}
            onChangeText={(emailOrUsername) => this.setState({ emailOrUsername })}
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
        <Text style={ForgotPasswordStyle} onPress={this.forgotPassword.bind(this)}>Forgot password?</Text>
        <View style={LoginButtonContainer}>
          <View style={LoginButtonBorder}>
            <View style={LogInButtonStyle}>
              <CustomButton onPress={this.logIn.bind(this)} marginSize={15} customFontSize={17}>Log in</CustomButton>
            </View>
          </View>
        </View>
      </View>
    );
  }
}
