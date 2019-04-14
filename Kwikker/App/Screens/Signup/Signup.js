import React, { Component } from 'react';
import { Text, View, Image, TouchableNativeFeedback, KeyboardAvoidingView } from 'react-native';
import axios from 'axios';
import styles from './Styles';
import CustomTextInput from '../../Components/CustomTextInput/CustomTextInput';
import CustomButton from '../../Components/CustomButton/CustomButton';
import Loader from '../../Components/Loader/Loader';

const { parentView, header, headerImage, backButtonContainer, backButton, dummyElement, imageContainer, createAccountText, submitButtonStyle, submitButtonContainer, submitButtonBorder, textInputsContainer, errorMessage, successMessage } = styles;
let messageStyle = successMessage;
const messages = {
  null: '',
  success: 'Registeration successfull, email confirmation pending.',
  fail: 'An error occurred, please try again.',
  usernameAlreadyExists: 'Username already exists',
  emailAlreadyExists: 'Email already exists',
  bothExists: 'Both email and username exists'
};

export default class SignUp extends Component {
  state = { username: '', password: '', email: '', loading: false, message: '' }

  /**
   *
   */
  onRegisterationFail(error) {
    messageStyle = errorMessage;
    this.setState({
      loading: false,
    });
    if (error.response.status === 403) {
      if (error.respone.data.username_already_exists && error.respone.data.email_already_exists) {
        this.setState({
          message: messages.bothExists
        });
      } else if (error.respone.data.username_already_exists) {
        this.setState({
          message: messages.usernameAlreadyExists
        });
      } else {
        this.setState({
          message: messages.emailAlreadyExists
        });
      }
    } else {
      this.setState({
        message: messages.fail
      });
    }
  }

  /**
   *
   */
  onRegisterationSuccess() {
    messageStyle = successMessage;
    this.setState({
      loading: false,
      message: messages.success
    });
  }

  /**
   *
   */
  submitButtonPress() {
    this.setState({
      loading: true,
      message: messages.null
    });
    axios.post('/account/registration', {
      username: this.state.username,
      password: this.state.password,
      email: this.state.email
    })
      .then((res) => {
        return this.onRegisterationSuccess();
      })
      .catch((err) => {
        return this.onRegisterationFail(err);
      });
  }

  /**
   *
   */
  renderRegisterationMessage() {
    return (
      <View>
        <Text style={messageStyle}>{this.state.message}</Text>
      </View>
    );
  }

  render() {
    const buttonDisabled = (this.state.username === '') || (this.state.email === '') || (this.state.password === '');
    return (
      <View style={parentView}>
        <Loader loading={this.state.loading} />

        <View style={header}>
          <View style={backButtonContainer}>
            <TouchableNativeFeedback onPress={() => this.props.navigation.goBack(null)}>
              <Image
                style={backButton}
                source={require('./../../Assets/Images/back_button.png')}
              />
            </TouchableNativeFeedback>
          </View>
          <View style={imageContainer}>
            <Image
              style={headerImage}
              source={require('./../../Assets/Images/Twitter_Logo_Blue.png')}
            />
          </View>
          <View style={dummyElement} />
        </View>

        <View>
          <Text style={createAccountText}>Create your account</Text>
        </View>

        <View style={textInputsContainer}>
          <CustomTextInput
            placeholder="Username"
            secureTextEntry={false}
            value={this.state.username}
            onChangeText={(username) => this.setState({ username })}
            autoFocus
            marginSize={30}
            marginTopSize={0}
          />
          <CustomTextInput
            placeholder="Email address"
            secureTextEntry={false}
            value={this.state.email}
            onChangeText={(email) => this.setState({ email })}
            autoFocus={false}
            autoCapitalize="none"
            autoFocus={false}
            marginSize={30}
            marginTopSize={0}
          />
          <CustomTextInput
            placeholder="Password"
            secureTextEntry
            value={this.state.password}
            onChangeText={(password) => this.setState({ password })}
            autoFocus={false}
            marginSize={30}
            marginTopSize={0}
          />
          {this.renderRegisterationMessage()}
        </View>
        <KeyboardAvoidingView style={submitButtonContainer} keyboardVerticalOffset={0}>
          <KeyboardAvoidingView style={submitButtonBorder} behavior="padding">
            <View style={submitButtonStyle}>
              <CustomButton onPress={this.submitButtonPress.bind(this)} marginSize={15} customFontSize={17} disabled={buttonDisabled}>Submit</CustomButton>
            </View>
          </KeyboardAvoidingView>
        </KeyboardAvoidingView>
      </View>
    );
  }
}
