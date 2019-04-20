import React from 'react';
import { Text, View, Image, TouchableOpacity, ScrollView, ToastAndroid, TouchableNativeFeedback, BackHandler } from 'react-native';
import axios from 'axios';
import CustomTextInput from '../../Components/CustomTextInput/CustomTextInput';
import styles from './Styles';
import CustomButton from '../../Components/CustomButton/CustomButton';

export default class Password extends React.Component {
  constructor(props) {
    super(props);
    const boolVar = this.props.navigation.getParam('forgotPassword');
    this.state = { New: '', Confirm: '', error: '', error2: '', disable: false, forgotPasswordForm: boolVar, message: '' };
  }

  componentWillMount() {
    if (this.state.forgotPasswordForm === true) {
      BackHandler.addEventListener('hardwareBackPress', () => { return true; });
    }
  }

  /**
   * update user's password and go back to account settings or the 'Login' page provided that the new and confirm password are match and not empty,
   * else Shows a toast message
   */
  updatePasswordButtonPress() {
    if (!(this.state.disable)) {
      if (this.state.New < 6) {
        axios.put('user/password', {
          password: this.state.New
        })
          .then((response) => {
            this.setState({ message: 'password changed successfully' });
            ToastAndroid.show(this.state.message, ToastAndroid.SHORT);
          })
          .catch((error) => {
            this.setState({ message: "error: username didn't change, try again later" });
            ToastAndroid.show(this.state.message, ToastAndroid.SHORT);
          })
          .then(() => {
            // always executed
            // //// Nader //////
            if (this.state.forgotPasswordForm === true) {
              axios.defaults.headers.common['TOKEN'] = '';
              this.props.navigation.navigate('Login');
            } else {
              this.props.navigation.goBack(null);
            }
          });
      } else {
        this.setState({ error: 'passwords must be at least 6 characters' });
        ToastAndroid.show(this.state.error, ToastAndroid.SHORT);
      }
    } else {
      this.setState({ error2: "passwords don't match or empty" });
      ToastAndroid.show(this.state.error2, ToastAndroid.SHORT);
    }
  }

  /**
   * Doesn't render the back button if it's considered as a forgotPassword form, renders it otherwise
   */
  backButtonRenderer() {
    if (this.state.forgotPasswordForm === true) {
      return (
        <View style={styles.backButtonContainer}>
          <TouchableNativeFeedback>
            <View style={styles.backButton} />
          </TouchableNativeFeedback>
        </View>
      );
    }
    return (
      <View style={styles.backButtonContainer}>
        <TouchableNativeFeedback onPress={() => this.props.navigation.goBack(null)}>
          <Image
            style={styles.backButton}
            source={require('./../../Assets/Images/back_button.png')}
          />
        </TouchableNativeFeedback>
      </View>
    );
  }

  render() {
    const buttonDisabled = (this.state.New === '') || (this.state.Confirm === '') || (this.state.New !== this.state.Confirm);
    this.state.disable = buttonDisabled;
    return (

      <View style={styles.container}>
        <ScrollView>
          <View>
            <View style={styles.upperPart}>

              <View style={styles.header}>
                {this.backButtonRenderer()}
                <View>
                  <Text style={styles.title}>Update password</Text>
                </View>
                <View />
                <View style={styles.dummyElement} />
              </View>

              <CustomTextInput
                placeholder="At least 6 characters"
                label="New password"
                secureTextEntry
                value={this.state.New}
                onChangeText={(New) => this.setState({ New })}
                autoFocus={false}
              />
              <CustomTextInput
                placeholder="At least 6 characters"
                label="Confirm password"
                secureTextEntry
                value={this.state.Confirm}
                onChangeText={(Confirm) => this.setState({ Confirm })}
                autoFocus={false}
              />
            </View>
            <View style={styles.aligneCenter}>
              <TouchableOpacity style={[styles.UpdatePasswordContainer, buttonDisabled ? styles.invalid : styles.valid]} onPress={this.updatePasswordButtonPress.bind(this)}>
                <Text style={styles.UpdatePasswordText}> UPDATE PASSWORD </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}