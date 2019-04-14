import React from 'react';
import { Text, View, Image, TouchableOpacity, ScrollView, ToastAndroid, TouchableNativeFeedback } from 'react-native';
import axios from 'axios';
import CustomTextInput from '../../Components/CustomTextInput/CustomTextInput';
import styles from './Styles';
import CustomButton from '../../Components/CustomButton/CustomButton';


export default class Password extends React.Component {
  constructor(props) {
    super(props);
    this.state = { New: '', Confirm: '', error: '', disable: false };
  }


  /**
   * update user's password and go back to account settings if the new and confirm password are match and not empty, else Shows a toast message
   */
  updatePasswordButtonPress() {
    if (!(this.state.disable)) {
      axios.put('user/password', {
        password: this.state.New
      })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        })
        .then(() => {
          // always executed
          this.props.navigation.goBack(null);
        });
    } else {
      this.setState({ error: "passwords don't match or empty" });
      ToastAndroid.show(this.state.error, ToastAndroid.SHORT);
    }
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
                <View style={styles.backButtonContainer}>
                  <TouchableNativeFeedback onPress={() => this.props.navigation.goBack(null)}>
                    <Image
                      style={styles.backButton}
                      source={require('./../../Assets/Images/back_button.png')}
                    />
                  </TouchableNativeFeedback>
                </View>
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