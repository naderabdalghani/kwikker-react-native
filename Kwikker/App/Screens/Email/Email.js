import React from 'react';
import { Text, View, Image, KeyboardAvoidingView, TouchableNativeFeedback, ToastAndroid } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import CustomTextInput from '../../Components/CustomTextInput/CustomTextInput';
import styles from './Styles';
import CustomButton from '../../Components/CustomButton/CustomButton';


export default class Email extends React.Component {
  constructor(props) {
    super(props);
    this.state = { Name: '@Email', message: '', Email: '' };
  }


  /**
   * update user's Email and go back to account settings
   */

  getEmail() {
    axios.get('user/email')
      .then((res) => {
        this.setState({
          Email: res.data,
        });
      })
      .catch((error) => {
        this.setState({
          Email: 'error loading email',
        });
      })
      .then(() => {
      });
  }

  nextButtonPress() {
    axios.put('user/email', {
      email: this.state.Name
    })
      .then((response) => {
        this.setState({ message: 'Email changed successfully' });
        ToastAndroid.show(this.state.message, ToastAndroid.SHORT);
        this.props.navigation.goBack(null);
      })
      .catch((error) => {
        this.setState({ message: "error: Email didn't change, try again later" });
        ToastAndroid.show(this.state.message, ToastAndroid.SHORT);
        this.props.navigation.goBack(null);
      });
  }

  render() {
    return (

      <View style={styles.container}>
        <View>

          <View style={styles.header}>
            <View style={styles.backButtonContainer}>
              <TouchableNativeFeedback onPress={() => this.props.navigation.goBack(null)}>
                <Image
                  style={styles.backButton}
                  source={require('./../../Assets/Images/back_button.png')}
                />
              </TouchableNativeFeedback>
            </View>
            <View>
              <Text style={styles.title}>Update email</Text>
            </View>
            <View />
            <View style={styles.dummyElement} />
          </View>

          <View>
            <Text style={styles.labelStyle}> Current </Text>
            <View style={styles.border}>
              <Text style={styles.labelStyle}>{this.state.Email} </Text>
            </View>
          </View>
          <CustomTextInput
            placeholder=""
            label="Email address"
            secureTextEntry={false}
            value={this.state.Name}
            onChangeText={(Name) => this.setState({ Name })}
            autoFocus={false}
          />
        </View>
        <KeyboardAvoidingView style={styles.ButtonContainer} keyboardVerticalOffset={0}>
          <KeyboardAvoidingView style={styles.ButtonBorder} behavior="padding">
            <View style={styles.ButtonStyle}>
              <CustomButton onPress={this.nextButtonPress.bind(this)} marginSize={15} customFontSize={17}>Next </CustomButton>
            </View>
          </KeyboardAvoidingView>
        </KeyboardAvoidingView>
      </View>
    );
  }
}