import React, { Component } from 'react';
import { Text, View, TouchableNativeFeedback, Image } from 'react-native';
import axios from 'axios';
import styles from './Styles';
import CustomRoundedTextInput from '../../Components/CustomRoundedTextInput/CustomRoundedTextInput';
import CustomButton from '../../Components/CustomButton/CustomButton';
import Loader from '../../Components/Loader/Loader';

const {
  parentView,
  header,
  backButtonContainer,
  backButton,
  changePasswordText,
  changePasswordTextContainer,
  Text1Style,
  Text2Style,
  errorMessage,
  successMessage,
  searchButtonStyle,
  textInputsContainer
} = styles;
let messageStyle;

export default class ForgotPassword extends Component {
  state = { email: '', loading: false, message: '' };

  /**
   * Stops the loading screen and provides the user with an error
   */
  onFail() {
    messageStyle = errorMessage;
    this.setState({
      loading: false,
      message: 'A user with the provided email does not exist.'
    });
  }

  /**
   * Stops the loading screen and provides the user with a success message
   */
  onSuccess() {
    messageStyle = successMessage;
    const { email } = this.state;
    this.setState({
      loading: false,
      message: `We've sent an email to ${email}. Click the link in the email to reset your password.`
    });
  }

  /**
   * Searches for the entered email, if it exists, a password-reset email is sent to that email and {@link #onSuccess|onSuccess} is called,
   * if not, {@link #onFail|onFail} is called
   */
  searchButtonPress() {
    this.setState({
      loading: true
    });
    axios.post('/account/forget_password', {
      email: this.state.email
    })
      .then((res) => {
        this.onSuccess();
      })
      .catch((err) => {
        this.onFail();
      });
  }

  /**
   * Renders a message if it already exists, or an introductory text if not
   */
  renderContent() {
    if (this.state.message !== '') {
      return (
        <View>
          <Text style={messageStyle}>{this.state.message}</Text>
          <Text style={Text2Style}>Please try entering your email again.</Text>
        </View>
      );
    }
    return (
      <View>
        <Text style={Text1Style}>Find your Kwikker account</Text>
        <Text style={Text2Style}>Enter your email.</Text>
      </View>
    );
  }

  render() {
    const buttonDisabled = (this.state.email === '');
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
          <View style={changePasswordTextContainer}>
            <Text style={changePasswordText}>Change Password</Text>
          </View>
        </View>

        {this.renderContent()}

        <View style={textInputsContainer}>
          <CustomRoundedTextInput
            secureTextEntry={false}
            value={this.state.email}
            onChangeText={(email) => this.setState({ email })}
            autoCapitalize="none"
            marginSize={10}
            marginTopSize={20}
          />
        </View>

        <View style={searchButtonStyle}>
          <CustomButton onPress={this.searchButtonPress.bind(this)} marginSize={14} customFontSize={15} disabled={buttonDisabled}>Search</CustomButton>
        </View>
      </View>
    );
  }
}
