import React, { Component } from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import { NavigationActions, DrawerActions } from 'react-navigation';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import Styles from './Styles';

export default class DrawerNavContainer extends Component {
  constructor(props) {
    super(props);
  }

  /**
   * Completely deletes the access token and redirects the user to the start screen
   */
  logoutButtonPressed() {
    AsyncStorage.removeItem('@app:session');
    axios.defaults.headers.common['TOKEN'] = '';
    this.props.navigation.navigate('StartScreen');
  }

  render() {
    const { navigation } = this.props;
    return (
      <View style={Styles.container}>
        <View style={Styles.top}>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('Profile')} style={{ flex: 3 }}>
            <Image
              source={require('./../../Assets/Images/pp.png')}
              style={Styles.photo}
            />
            <Text style={Styles.userName}>UserName</Text>
            <Text style={Styles.userHandle}>@user_handle</Text>
          </TouchableOpacity>
          <View style={{ flex: 1, flexDirection: 'row' }}>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('FollowingsList')} style={{ flex: 1 }}>
              <Text style={Styles.followingCount}>500
                <Text style={Styles.followingCountText}>{' '}Following</Text>
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('FollowersList')} style={{ flex: 1 }}>
              <Text style={Styles.followersCount}>1500
                <Text style={Styles.followersCountText}>{' '}Follower</Text>
              </Text>
            </TouchableOpacity>
          </View>

        </View>
        <View style={Styles.bottom}>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('Profile')}>
            <Text style={Styles.text}> Profile </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('Settings')}>
            <Text style={Styles.text}> Settings and privacy </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.logoutButtonPressed.bind(this)}>
            <Text style={Styles.text}> Logout </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
