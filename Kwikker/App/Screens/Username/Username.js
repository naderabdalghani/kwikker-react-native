import React from 'react';
import { Text, View, Image, KeyboardAvoidingView, TouchableNativeFeedback, ToastAndroid } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import CustomTextInput from '../../Components/CustomTextInput/CustomTextInput';
import styles from './Styles';
import CustomButton from '../../Components/CustomButton/CustomButton';

/** @module Username **/

export default class Username extends React.Component {
  constructor(props) {
    super(props);
    this.state = { Password: '', Name: '', currentUsername: '', message: '' };
  }

  componentDidMount() {
    AsyncStorage.getItem('@app:id').then((id) => {
      this.setState({ currentUsername: id });
      this.setState({ Name: id });
    });
    this.willFocusListener = this.props.navigation.addListener(
      'willFocus',
      () => {
        AsyncStorage.getItem('@app:id').then((id) => {
          this.setState({ currentUsername: id });
          this.setState({ Name: id });
        });
      }
    );
  }


  /**
   * update user's username and go back to account settings
   * @memberof Username
   */
  doneButtonPress() {
    axios.put('user/username', {
      username: this.state.Name,
      password: this.state.Password
    })
      .then((res) => {
        this.setState({ message: 'username changed successfully' });
        ToastAndroid.show(this.state.message, ToastAndroid.SHORT);
        AsyncStorage.multiSet([['@app:session', res.data.token], ['@app:id', this.state.Name]]).then(() => {
          axios.defaults.headers.common['TOKEN'] = res.data.token;
          this.props.navigation.goBack(null);
        }).catch(() => {});
      })
      .catch((err) => {
        this.setState({ message: "error: username didn't change, Username already exists " });
        ToastAndroid.show(this.state.message, ToastAndroid.SHORT);
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
              <Text style={styles.title}>Change username</Text>
            </View>
            <View />
            <View style={styles.dummyElement} />
          </View>

          <View>
            <Text style={styles.labelStyle}> Current </Text>
            <View style={styles.border}>
              <Text style={styles.labelStyle}>
                {this.state.currentUsername}
              </Text>
            </View>
          </View>
          <CustomTextInput
            placeholder=""
            label="New"
            secureTextEntry={false}
            value={this.state.Name}
            onChangeText={(Name) => this.setState({ Name })}
            autoFocus={false}
          />
          <CustomTextInput
            placeholder=""
            label="Password"
            secureTextEntry={false}
            value={this.state.Password}
            onChangeText={(Password) => this.setState({ Password })}
            autoFocus={false}
          />
        </View>
        <KeyboardAvoidingView style={styles.ButtonContainer} keyboardVerticalOffset={0}>
          <KeyboardAvoidingView style={styles.ButtonBorder} behavior="padding">
            <View style={styles.ButtonStyle}>
              <CustomButton onPress={this.doneButtonPress.bind(this)} marginSize={15} customFontSize={17}>Done</CustomButton>
            </View>
          </KeyboardAvoidingView>
        </KeyboardAvoidingView>
      </View>
    );
  }
}