import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Styles from './Styles';


export default class Account extends React.Component {
  constructor(props) {
    super(props);
    this.state = { currentUsername: '' };
  }


  componentDidMount() {
    AsyncStorage.getItem('@app:id').then((id) => {
      this.setState({ currentUsername: id });
    });
  }

  /**
   * Redirects the user to the update Username form
   */
  Username() {
    this.props.navigation.push('Username');
  }

  /**
   * Redirects the user to the update Email form
   */
  Email() {
    this.props.navigation.push('Email');
  }

  /**
   * Redirects the user to the update Password form
   */
  Password() {
    this.props.navigation.push('Password');
  }

  render() {
    return (

      <View style={Styles.container}>
        <View>

          <View style={Styles.TitleContainer}>
            <Text style={Styles.Title}>
              Login and security
            </Text>
          </View>


          <View style={Styles.box}>
            <TouchableOpacity onPress={this.Username.bind(this)}>
              <Text style={Styles.blackFont}> Username </Text>
              <Text style={Styles.grayFont}> {this.state.currentUsername} </Text>
            </TouchableOpacity>
          </View>
          <View style={Styles.box}>
            <TouchableOpacity onPress={this.Email.bind(this)}>
              <Text style={Styles.blackFont}> Email </Text>
              <Text style={Styles.grayFont}> name@m.com </Text>
            </TouchableOpacity>
          </View>
          <View style={Styles.box}>
            <TouchableOpacity onPress={this.Password.bind(this)}>
              <Text style={Styles.blackFont}> Password </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}
