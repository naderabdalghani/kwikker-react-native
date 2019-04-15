import React, { Component } from 'react';
import { Text, View, Image, TouchableNativeFeedback, KeyboardAvoidingView, ScrollView, Keyboard } from 'react-native';
import axios from 'axios';
import { DatePicker } from 'native-base';
import styles from './Styles';
import CustomTextInput from '../../Components/CustomTextInput/CustomTextInput';
import CustomButton from '../../Components/CustomButton/CustomButton';
import Loader from '../../Components/Loader/Loader';

const {
  parentView,
  header,
  headerImage,
  backButtonContainer,
  backButton,
  dummyElement,
  imageContainer,
  createAccountText,
  submitButtonStyle,
  submitButtonContainer,
  submitButtonBorder,
  textInputsContainer,
  errorMessage,
  successMessage,
  resendButton,
  dateContainer,
  dateText,
  datePickerPlaceholder,
  datePickerText,
  datePickerContainer,
} = styles;

let messageStyle = successMessage;

const messages = {
  null: '',
  success: 'Registration successfull, email confirmation pending.',
  fail: 'An error occurred, please try again.',
  usernameAlreadyExists: 'Username already exists',
  emailAlreadyExists: 'Email already exists',
  bothExists: 'Both email and username exists',
  resend: 'Confirmation email resent successfully.'
};

/** @module SignUp **/

export default class SignUp extends Component {
  state = { username: '', screenname: '', password: '', email: '', loading: false, message: '', date: '' }

  /**
   * Displays an error message according to the error type received in the response
   * @memberof SignUp
   */
  onRegistrationFail(error) {
    const statusCode = error.response.status;
    const usernameAlreadyExists = error.response.data.username_already_exists;
    const emailAlreadyExists = error.response.data.email_already_exists;
    messageStyle = errorMessage;
    this.setState({
      loading: false,
    });
    if (statusCode === 403) {
      if (usernameAlreadyExists && emailAlreadyExists) {
        this.setState({
          message: messages.bothExists
        });
      } else if (usernameAlreadyExists) {
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
   * Stops the loading screen and displays a success message
   * @memberof SignUp
   */
  onRegistrationSuccess() {
    messageStyle = successMessage;
    this.setState({
      loading: false,
      message: messages.success
    });
  }

  /**
   * Sends a user's credentials and data then either calls {@link #onRegistrationSuccess|onRegistrationSuccess} or calls {@link #onRegistrationFail|onRegistrationFail}
   * @memberof SignUp
   */
  submitButtonPress() {
    Keyboard.dismiss();
    this.setState({
      loading: true,
      message: messages.null
    });
    axios.post('/account/registration', {
      username: this.state.username,
      password: this.state.password,
      email: this.state.email,
      screen_name: this.state.screenname,
      birth_date: this.state.date,
    })
      .then((res) => {
        return this.onRegistrationSuccess();
      })
      .catch((err) => {
        let error = JSON.stringify(err);
        error = JSON.parse(error);
        return this.onRegistrationFail(error);
      });
  }

  /**
   * Sends a user's email then either displays a success message upon sending a new confirmation email or displays an error otherwise
   * @memberof SignUp
   */
  resendButtonPress() {
    this.setState({
      loading: true,
      message: messages.null
    });
    axios.post('/account/registration/resend_email', {
      email: this.state.email
    })
      .then((res) => {
        messageStyle = successMessage;
        this.setState({
          loading: false,
          message: messages.resend
        });
      })
      .catch((err) => {
        this.setState({
          loading: false,
          message: messages.fail
        });
      });
  }

  /**
   * Renders a 'resend' button if an unconfirmed user has already registered successfully or his email already exists
   * @memberof SignUp
   */
  renderRegistrationMessage() {
    if (this.state.message === messages.success || this.state.message === messages.emailAlreadyExists || this.state.message === messages.bothExists) {
      return (
        <View>
          <Text style={messageStyle}>{this.state.message}</Text>
          <TouchableNativeFeedback onPress={this.resendButtonPress.bind(this)}>
            <Text style={resendButton}>Resend confirmation email</Text>
          </TouchableNativeFeedback>
        </View>
      );
    }
    return (
      <View>
        <Text style={messageStyle}>{this.state.message}</Text>
      </View>
    );
  }

  render() {
    const buttonDisabled = (this.state.username === '') || (this.state.email === '') || (this.state.password === '') || (this.state.screenname === '') || (this.state.date === '');
    return (
      <View style={parentView}>
        <Loader loading={this.state.loading} loadingMessage="Loading" />

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

        <ScrollView style={textInputsContainer}>
          <CustomTextInput
            placeholder="Username"
            secureTextEntry={false}
            value={this.state.username}
            onChangeText={(username) => this.setState({ username })}
            autoFocus
            marginSize={30}
            marginTopSize={0}
            autoCapitalize="none"
          />
          <CustomTextInput
            placeholder="Screen name"
            secureTextEntry={false}
            value={this.state.screenname}
            onChangeText={(screenname) => this.setState({ screenname })}
            autoFocus
            marginSize={30}
            marginTopSize={0}
            autoCapitalize="none"
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
          <View style={dateContainer}>
            <Text style={dateText}>Birth date</Text>
            <View style={datePickerContainer}>
              <DatePicker
                locale="en"
                timeZoneOffsetInMinutes={undefined}
                modalTransparent={false}
                animationType="fade"
                androidMode="default"
                placeHolderText="Add your date of birth"
                textStyle={datePickerText}
                placeHolderTextStyle={datePickerPlaceholder}
                onDateChange={(date) => this.setState({ date })}
                disabled={false}
              />
            </View>
          </View>

          {this.renderRegistrationMessage()}
        </ScrollView>
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
