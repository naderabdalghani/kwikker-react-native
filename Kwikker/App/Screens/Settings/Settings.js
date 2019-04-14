import React, { Component } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import Styles from './Styles';

export default class Settings extends Component {
  constructor(props) {
    super(props);
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

          <View style={Styles.developersContainer}>
            <Text style={Styles.developers}>
              @UserName
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
