import React, { Component } from 'react';
import { Text, View, Button, Spinner, Image, TouchableNativeFeedback } from 'react-native';
import styles from './Styles';
import CustomTextInput from '../../Components/CustomTextInput/CustomTextInput';
import Section from '../../Components/Section/Section';
import CustomButton from '../../Components/CustomButton/CustomButton';

export default class Login extends Component {
  constructor(props) {
    super(props);
  }

  state = { email: '', password: '', error: '', loading: false };

  onButtonPress() {
  }

  onLoginFail() {
  }

  onLoginSuccess() {
  }

  signUp() {
    this.props.navigation.push('Signup');
  }

  login() {
    this.props.navigation.navigate('DrawerNavigator');
  }

  renderButton() {
    if (this.state.loading) {
      return <Spinner size="small" />;
    }

    return (
      <Button
        onPress={this.onButtonPress.bind(this)}
        title="Login"
      />
    );
  }

  render() {
    return (
      <View>
        <View style={{ flexDirection: 'row', backgroundColor: 'red' }}>
          <Image
            style={styles.HeaderImage}
            source={require('./../../Assets/Images/Twitter_Logo_Blue.png')}
          />
          <Text style={styles.SignUpButton} onPress={this.signUp.bind(this)}>Sign Up</Text>
        </View>

        <Text style={styles.Intro}>Log in to Twitter.</Text>
        <Section>
          <CustomTextInput
            placeholder="user@gmail.com"
            label="Email"
            value={this.state.email}
            onChangeText={email => this.setState({ email })}
          />
        </Section>

        <Section>
          <CustomTextInput
            secureTextEntry
            placeholder="password"
            label="Password"
            value={this.state.password}
            onChangeText={password => this.setState({ password })}
          />
        </Section>

        <Text style={styles.errorTextStyle}>
          {this.state.error}
        </Text>

        <Section>
          {this.renderButton()}
        </Section>
      </View>
    );
  }
}
