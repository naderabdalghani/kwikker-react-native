import React, { Component } from 'react';
import { Text, View, Image, Button, TouchableNativeFeedback } from 'react-native';
import styles from './Styles';
import CustomButton from '../../Components/CustomButton/CustomButton';


export default class StartScreen extends Component {
  constructor(props) {
    super(props);
  }

  logIn() {
    this.props.navigation.push('Login');
  }

  signUp() {
    this.props.navigation.push('Signup');
  }

  render() {
    return (
      <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center' }}>
        <View style={{ alignItems: 'center' }}>
          <Image
            style={styles.HeaderImage}
            source={require('./../../Assets/Images/Twitter_Logo_Blue.png')}
          />
        </View>
        <View style={{ alignItems: 'center' }}>
          <Text style={styles.Intro}>See what's happening in the world right now.</Text>
          <CustomButton
            onPress={this.signUp.bind(this)}
            marginSize={90}
            customFontSize={25}
          >
            Create account
          </CustomButton>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', alignSelf: 'stretch', marginLeft: 45, marginBottom: 30 }}>
          <Text style={{ fontSize: 15 }}>Have an account already?</Text>
          <TouchableNativeFeedback
            onPress={this.logIn.bind(this)}
          >
            <Text style={{ color: '#38A1F3', fontSize: 15 }}> Log in</Text>
          </TouchableNativeFeedback>
        </View>
      </View>
    );
  }
}
