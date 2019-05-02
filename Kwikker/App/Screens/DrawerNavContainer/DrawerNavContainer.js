import React, { Component } from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import { NavigationActions, DrawerActions } from 'react-navigation';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import Styles from './Styles';

/** @module DrawerNavContainer **/

export default class DrawerNavContainer extends Component {
  constructor(props) {
    super(props);
    this.state = { username: '', profileData: '' };
  }


  componentDidMount() {
    AsyncStorage.getItem('@app:id').then((id) => {
      this.setState({ username: id });
      this.updateProfile(id);
    });
  }


  updateProfile(userName) {
    axios.get('user/profile', {
      params: {
        username: userName
      }
    })
      .then((response) => {
        this.setState({
          profileData: response.data,
        });
      })
      .catch((error) => {

        // handle error
        // console.log(error);
      })
      .then(() => {
        // always executed
      });
  }

  /**
   * Completely deletes the access token and username then redirects the user to the start screen
   * @memberof DrawerNavContainer
   */
  logoutButtonPressed() {
    AsyncStorage.multiRemove(['@app:session', '@app:id']);
    axios.defaults.headers.common['TOKEN'] = '';
    this.props.navigation.navigate('StartScreen');
  }

  render() {
    const { navigation } = this.props;
    return (
      <View style={Styles.container}>
        <View style={Styles.top}>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('Profile', { username: this.state.username })} style={{ flex: 3 }}>
            <Image
              source={{ uri: this.state.profileData.profile_image_url }}
              style={Styles.photo}
            />
            <Text style={Styles.userName}>{this.state.profileData.screen_name}</Text>
            <Text style={Styles.userHandle}>@{this.state.profileData.username}</Text>
          </TouchableOpacity>
          <View style={{ flex: 1, flexDirection: 'row' }}>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('FollowingList', {userName: this.state.profileData.username})} style={{ flex: 1 }}
            >
              <Text style={Styles.followingCount}>{this.state.profileData.following_count}
                <Text style={Styles.followingCountText}>{' '}Following</Text>
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('FollowerList', {userName: this.state.profileData.username})} style={{ flex: 1 }}
            >
              <Text style={Styles.followersCount}>{this.state.profileData.followers_count}
                <Text style={Styles.followersCountText}>{' '}Follower</Text>
              </Text>
            </TouchableOpacity>
          </View>

        </View>
        <View style={Styles.bottom}>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('Profile', { username: this.state.username })}>
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
