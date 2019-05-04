import React, { Component } from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import io from 'socket.io-client';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import RNRestart from 'react-native-restart';
import Styles from './Styles';
import Feather from 'react-native-vector-icons/Feather';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';

/** @module DrawerNavContainer **/

export default class DrawerNavContainer extends Component {
  constructor(props) {
    super(props);
    this.state = { profileData: '' };
  }


  componentDidMount() {
    AsyncStorage.getItem('@app:id').then((id) => {
      this.updateProfile(id);
    });
    this.willFocusListener = this.props.navigation.addListener(
      'willFocus',
      () => {
        AsyncStorage.getItem('@app:id').then((id) => {
          this.updateProfile(id);
        });
      }
    );
  }


  /**
   * update data
   */
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
   */
  logoutButtonPressed() {
    axios.defaults.headers.common['TOKEN'] = '';
    AsyncStorage.clear().then(() => {
    }).catch(() => {});
    RNRestart.Restart();
  }

  render() {
    const { navigation } = this.props;
    return (
      <View style={Styles.container}>
        <View style={Styles.top}>
          <TouchableOpacity
            onPress={() => {
              AsyncStorage.getItem('@app:id').then((id) => {
                this.updateProfile(id);
                this.props.navigation.navigate('Profile', { username: id });
              });
            }} style={{ flex: 3 }}
          >
            <Image
              source={{ uri: this.state.profileData.profile_image_url }}
              style={Styles.photo}
            />
            <Text style={Styles.userName}><Text style={{ color: 'white', fontSize: 0 }}>a</Text>{this.state.profileData.screen_name}</Text>
            <Text style={Styles.userHandle}>@<Text style={{ color: 'white', fontSize: 0 }}>a</Text>{this.state.profileData.username}</Text>
          </TouchableOpacity>
          <View style={{ flex: 1, flexDirection: 'row' }}>
            <TouchableOpacity
              onPress={() => {
                AsyncStorage.getItem('@app:id').then((id) => {
                  this.updateProfile(id);
                  this.props.navigation.navigate('FollowingList', { userName: id });
                });
              }} style={{ flex: 1 }}
            >
              <Text style={Styles.followingCount}>{this.state.profileData.following_count}
                <Text style={Styles.followingCountText}>{' '}Following</Text>
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                AsyncStorage.getItem('@app:id').then((id) => {
                  this.updateProfile(id);
                  this.props.navigation.navigate('FollowerList', { userName: id });
                });
              }}


              style={{ flex: 1 }}
            >
              <Text style={Styles.followersCount}>{this.state.profileData.followers_count}
                <Text style={Styles.followersCountText}>{' '}Follower</Text>
              </Text>
            </TouchableOpacity>
          </View>

        </View>
        <View style={Styles.bottom}>
          <TouchableOpacity
            style={Styles.button} onPress={() => {
              AsyncStorage.getItem('@app:id').then((id) => {
                this.updateProfile(id);
                this.props.navigation.navigate('Profile', { username: id });
              });
            }}
          >
            <AntDesign name="user" size={28} color="#000" style={Styles.icon} />
            <Text style={Styles.text}> Profile </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={Styles.button} onPress={() => {
              AsyncStorage.getItem('@app:id').then((id) => {
                this.updateProfile(id);
                this.props.navigation.navigate('Settings');
              });
            }}
          >
            <Feather name="settings" size={26} color="#000" style={Styles.icon} />
            <Text style={Styles.text}> Settings and privacy </Text>
          </TouchableOpacity>
          <TouchableOpacity style={Styles.button} onPress={this.logoutButtonPressed.bind(this)}>
            <SimpleLineIcons name="logout" size={25} color="#000" style={Styles.icon} />
            <Text style={Styles.text}> Logout </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
