import React from 'react';
import { Text, View, Image, TouchableOpacity, ScrollView, ToastAndroid, TouchableNativeFeedback, BackHandler } from 'react-native';
import { NavigationActions, StackActions } from 'react-navigation';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import CustomTextInput from '../../Components/CustomTextInput/CustomTextInput';
import styles from './Styles';
import CustomButton from '../../Components/CustomButton/CustomButton';

export default class Password extends React.Component {
  constructor(props) {
    super(props);
    const boolVar = this.props.navigation.getParam('forgotPassword');
    const code = this.props.navigation.getParam('resetCode');
    this.state = { Current: '', New: '', Confirm: '', disable: false, forgotPasswordForm: boolVar, resetPasswordCode: code, message: '' };
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
      if (this.state.New.length > 5) {
        if (this.state.forgotPasswordForm === true) {
          axios.put('/account/reset_password', {
            password: this.state.New,
          }, {
            headers: {
              CODE: this.state.resetPasswordCode
            }
          })
            .then((response) => {
              ToastAndroid.show('password changed successfully', ToastAndroid.SHORT);
            })
            .catch((error) => {
              ToastAndroid.show("error: password didn't change, try again later", ToastAndroid.SHORT);
            })
            .then(() => {
            });
          this.props.navigation.dispatch(StackActions.reset({
            index: 0,
            key: 'StartStackNavigator',
            actions: [
              NavigationActions.navigate({
                routeName: 'Login'
              }),
            ],
          }));
        } else {
          axios.put('user/password', {
            password: this.state.New,
            old_password: this.state.Current
          })
            .then((response) => {
              AsyncStorage.setItem('@app:session', response.data.token).then(() => {}).catch(() => {}).then(() => {
                axios.defaults.headers.common['TOKEN'] = response.data.token;
                this.setState({ message: 'password changed successfully' });
                ToastAndroid.show(this.state.message, ToastAndroid.SHORT);
              });
            })
            .catch((error) => {
              this.setState({ message: "error: username didn't change, try again later" });
              ToastAndroid.show(this.state.message, ToastAndroid.SHORT);
            })
            .then(() => {
              // always executed
              this.props.navigation.goBack(null);
            });
        }
      } else {
        ToastAndroid.show('passwords must be at least 6 characters', ToastAndroid.SHORT);
      }
    } else {
      ToastAndroid.show("passwords don't match or empty", ToastAndroid.SHORT);
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

  /**
   * Doesn't render the current password text input if it's considered as a forgotPassword form, renders it otherwise
   */
  currentPasswordRenderer() {
    if (this.state.forgotPasswordForm === true) {
      return (null);
    }
    return (
      <CustomTextInput
        placeholder=""
        label="Current password"
        secureTextEntry
        value={this.state.Current}
        onChangeText={(Current) => this.setState({ Current })}
        autoFocus={false}
      />
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
              {this.currentPasswordRenderer()}
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