import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import Styles from './Styles';


export default class Account extends React.Component {
  constructor(props) {
    super(props);
  }

  Username() {
    this.props.navigation.push('Username');
  }

  Email() {
    this.props.navigation.push('Email');
  }

  // Phone() {
  //   this.props.navigation.push('Phone');
  // }

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
              <Text style={Styles.grayFont}> @Username </Text>
            </TouchableOpacity>
          </View>
          {/* <View style={Styles.box}>
            <TouchableOpacity onPress={this.Phone.bind(this)}>
              <Text style={Styles.blackFont}> Phone </Text>
              <Text style={Styles.grayFont}> 0123456789 </Text>
            </TouchableOpacity>
          </View> */}
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
