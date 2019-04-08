import React, { Component } from 'react';
import { Text, View, TouchableNativeFeedback, TextInput, Image, KeyboardAvoidingView } from 'react-native';
import axios from 'axios';
import styles from './Styles';
import CustomTextInput2 from '../../Components/CustomTextInput2/CustomTextInput2';
import CustomButton from '../../Components/CustomButton/CustomButton';
import Loader from '../../Components/Loader/Loader';

export default class ForgotPassword extends Component {
  state = { username: '', password: '', email: '', loading: false, error: '' };

  /**
   *
   */
  onRegisterationFail() {
  }

  /**
   *
   */
  onRegisterationSuccess() {
  }

  /**
   *
   */
  nextButtonPress() {
  }

  render() {
    const { parentView, header, backButtonContainer, backButton, changePasswordText, changePasswordTextContainer, Text1Style, Text2Style, searchButtonStyle, textInputsContainer } = styles;
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

        <Text style={Text1Style}>Find your Kwikker account</Text>
        <Text style={Text2Style}>Enter your email.</Text>

        <View style={textInputsContainer}>
          <CustomTextInput2
            placeholder="Email address"
            secureTextEntry={false}
            value={this.state.email}
            onChangeText={(email) => this.setState({ email })}
            autoCapitalize="none"
            marginSize={10}
            marginTopSize={20}
          />
        </View>

        <View style={searchButtonStyle}>
          <CustomButton onPress={this.nextButtonPress.bind(this)} marginSize={14} customFontSize={15} disabled={buttonDisabled}>Search</CustomButton>
        </View>
      </View>
    );
  }
}
