import React, { Component } from 'react';
import { Text, View, TouchableOpacity, TouchableNativeFeedback, Image } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Styles from './Styles';

export default class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = { username: '', };
  }

  componentDidMount() {
    AsyncStorage.getItem('@app:id').then((id) => {
      this.setState({ username: id });
    });
  }

  Account() {
    this.props.navigation.push('Account');
  }

  PrivacyAndSafety() {
    this.props.navigation.push('PrivacyAndSafety');
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
              <Text style={Styles.title}>Settings and privacy</Text>
            </View>
            <View />
            <View style={Styles.dummyElement} />
          </View>

          <View style={Styles.developersContainer}>
            <Text style={Styles.developers}>
              @{this.state.username}
            </Text>
          </View>


          <View style={Styles.box}>
            <TouchableOpacity onPress={this.Account.bind(this)}>
              <Text> Account </Text>
            </TouchableOpacity>
          </View>
          <View style={Styles.box}>
            <TouchableOpacity onPress={this.PrivacyAndSafety.bind(this)}>
              <Text> Privacy and safety </Text>
            </TouchableOpacity>
          </View>

          <View style={Styles.developersContainer}>
            <Text style={Styles.developers}>
              Developers
            </Text>
          </View>
          <Text style={Styles.members}>
            Nader
          </Text>
          <Text style={Styles.members}>
            Shady Fahmy
          </Text>
          <Text style={Styles.members}>
            Khaled Amgad
          </Text>
          <Text style={Styles.members}>
            Sara Yasser
          </Text>
        </View>
      </View>
    );
  }
}
