import React from 'react';
import { Text, View, TouchableOpacity, Image, TouchableNativeFeedback } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import Styles from './Styles';

/** @module Account **/
export default class Account extends React.Component {
  constructor(props) {
    super(props);
    this.state = { currentUsername: '', Email: '' };
  }


  componentDidMount() {
    this.getEmail();
    AsyncStorage.getItem('@app:id').then((id) => {
      this.setState({ currentUsername: id });
    });
    this.willFocusListener = this.props.navigation.addListener(
      'willFocus',
      () => {
        AsyncStorage.getItem('@app:id').then((id) => {
          this.setState({ currentUsername: id });
        });
        this.getEmail();
      }
    );
  }

  /** get Email.
 * gets Email of the current user.
 * @memberof Account
 */
  getEmail() {
    axios.get('user/email')
      .then((res) => {
        this.setState({
          Email: res.data.email,
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

  /** update username.
  * Redirects the user to the update Username form.
  * @memberof Account
  */
  Username() {
    this.props.navigation.navigate('Username');
  }

  /** update Email.
  * Redirects the user to the update Email form.
  * @memberof Account
  */
  Email() {
    this.props.navigation.navigate('Email');
  }

  /** update Password.
  * Redirects the user to the update Password form.
  * @memberof Account
  */
  Password() {
    this.props.navigation.navigate('Password');
  }


  render() {
    return (

      <View style={Styles.container}>
        <View>

          <View style={Styles.header}>
            <View style={Styles.backButtonContainer}>
              <TouchableNativeFeedback onPress={() => this.props.navigation.goBack(null)}>
                <Image
                  style={Styles.backButton}
                  source={require('./../../Assets/Images/back_button.png')}
                />
              </TouchableNativeFeedback>
            </View>
            <View style={Styles.titleContainer}>
              <Text style={Styles.title}>Account</Text>
              <Text style={Styles.username}>@{this.state.currentUsername}</Text>
            </View>
            <View />
            <View style={Styles.dummyElement} />
          </View>

          <View style={Styles.TitleContainer}>
            <Text style={Styles.Title}>
              Login and security
            </Text>
          </View>


          <View style={Styles.box}>
            <TouchableOpacity onPress={this.Username.bind(this)}>
              <Text style={Styles.blackFont}> Username </Text>
              <Text style={Styles.grayFont}> @{this.state.currentUsername} </Text>
            </TouchableOpacity>
          </View>
          <View style={Styles.box}>
            <TouchableOpacity onPress={this.Email.bind(this)}>
              <Text style={Styles.blackFont}> Email </Text>
              <Text style={Styles.grayFont}> {this.state.Email} </Text>
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
