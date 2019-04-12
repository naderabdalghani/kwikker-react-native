import React, { Component } from 'react';
import { Text, View, TouchableNativeFeedback, Image, KeyboardAvoidingView } from 'react-native';
import axios from 'axios';
import styles from './Styles';
import CustomTextInput2 from '../../Components/CustomTextInput2/CustomTextInput2';
import CustomButton from '../../Components/CustomButton/CustomButton';
import Loader from '../../Components/Loader/Loader';

const { parentView, header, backButtonContainer, backButton, changePasswordText, changePasswordTextContainer, Text1Style, Text2Style, errorMessage, successMessage, searchButtonStyle, textInputsContainer } = styles;
let messageStyle;
export default class ForgotPassword extends Component {
  state = { email: '', loading: false, message: '' };

  /**
   *
   */
  onFail() {

  }

  /**
   *
   */
  onSuccess() {
  }

  /**
   *
   */
  searchButtonPress() {
    this.setState({
      loading: true
    });
    axios.post('/account/forget_password', {
      email: this.state.email
    })
      .then((res) => {
        messageStyle = successMessage;
        this.setState({
          loading: false,
          message: 'A new password was sent successfully.'
        });
      })
      .catch((err) => {
        messageStyle = errorMessage;
        this.setState({
          loading: false,
          message: 'A user with the provided email does not exist.'
        });
      });
  }

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
          <CustomTextInput2
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
