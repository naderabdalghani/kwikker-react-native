import React, { Component } from 'react';
import { Text, View, Button, Image, TouchableNativeFeedback, ToastAndroid, KeyboardAvoidingView } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import styles from './Styles';
import CustomTextInput from '../../Components/CustomTextInput/CustomTextInput';
import CustomButton from '../../Components/CustomButton/CustomButton';
import Loader from '../../Components/Loader/Loader';

export default class Login extends Component {
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
    const { parentView, header, headerImage, backButtonContainer, backButton, dummyElement, imageContainer, createAccountText, nextButtonStyle, nextButtonContainer, nextButtonBorder } = styles;
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

        <View>
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
        </View>
        <KeyboardAvoidingView style={nextButtonContainer} keyboardVerticalOffset={0}>
          <KeyboardAvoidingView style={nextButtonBorder} behavior="padding">
            <View style={nextButtonStyle}>
              <CustomButton onPress={this.nextButtonPress.bind(this)} marginSize={15} customFontSize={17} disabled={buttonDisabled}>Next</CustomButton>
            </View>
          </KeyboardAvoidingView>
        </KeyboardAvoidingView>
      </View>
    );
  }
}
