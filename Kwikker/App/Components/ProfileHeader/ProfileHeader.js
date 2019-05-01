import React from 'react';
import { TouchableOpacity, Text, View, ScrollView, Image, TouchableNativeFeedback, Animated } from 'react-native';
import axios from 'axios';
import styles from './Styles';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      scrollY: new Animated.Value(0),
      myProfile: true,
      following: true,
      blocked: false,
    };
  }


  componentDidMount() {
    this.setState({
      myProfile: this.props.myProfile,
    });
  }

  follow() {
    axios.post('interactions/follow', {
      username: this.props.username
    })
      .then((response) => {
        this.setState({
        });
      })
      .catch((error) => {
      });
  }

  unfollow() {
    axios.delete('interactions/follow', {
      params: {
        username: this.props.username
      }
    }).then((response) => {
      this.setState({
      });
    })
      .catch((error) => {
      });
  }

  block() {

  }

  unblock() {

  }

  mute() {

  }

  unmute() {

  }

  rightButton() {
    if (this.props.following) {
      return (
        <TouchableOpacity
          style={styles.following}
          onPress={() => { this.unfollow(); }}
        >
          <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 15 }}>
            Following
          </Text>
        </TouchableOpacity>
      );
    }
    if (this.props.blocked) {
      return (
        <TouchableOpacity
          style={styles.blocked}
        >
          <Text style={{ color: 'red', fontWeight: 'bold', fontSize: 15 }}>
            Blocked
          </Text>
        </TouchableOpacity>
      );
    }
    if (this.props.following === false) {
      return (
        <TouchableOpacity
          style={styles.follow}
          onPress={() => { this.follow(); }}
        >
          <Text style={{ color: '#1DA1F2', fontWeight: 'bold', fontSize: 15 }}>
              Follow
          </Text>
        </TouchableOpacity>
      );
    }
    if (this.state.myProfile) {
      return (
        <TouchableOpacity
          style={styles.EditProfile}
          onPress={this.props.EditProfile}
        >
          <Text style={{ color: '#657786', fontWeight: 'bold' }}>
            Edit Profile
          </Text>
        </TouchableOpacity>
      );
    }
  }

  render() {
    const ProfileImageHeight = this.state.scrollY.interpolate({
      inputRange: [0, 50],
      outputRange: [80, 40],
      extrapolate: 'clamp'
    });

    return (

      <View style={{ flex: 1 }}>
        <Image
          style={styles.Cover}
          source={{ uri: this.props.profileBannerUrl }}
        />
        <ScrollView style={{ flex: 1 }}>
          <View style={{ flex: 1, flexDirection: 'row' }}>
            <View style={styles.ProfileImageContainer}>
              <Image
                style={styles.ProfileImage}
                source={{ uri: this.props.profileImageUrl }}
              />
            </View>
            {this.rightButton()}
          </View>

          <View style={{ marginLeft: 10, marginTop: 4 }}>
            <Text style={{ fontWeight: 'bold', fontSize: 20, color: '#000' }}>
              {this.props.screenName}
            </Text>
            <Text style={styles.Gray}>
              @{this.props.username}
            </Text>
            <Text style={styles.Gray}>
              {this.props.bio}
            </Text>
            <Text style={styles.Gray}>Joined {this.props.createdAt} </Text>
            <Text style={styles.Gray}>date {this.props.birthDate}</Text>

            <View style={{ flex: 1, flexDirection: 'row' }}>
              <Text>{this.props.followingCount}</Text>
              <TouchableOpacity onPress={this.props.Following}>
                <Text style={styles.Gray}> Following   </Text>
              </TouchableOpacity>
              <Text>{this.props.followersCount}</Text>
              <TouchableOpacity onPress={this.props.Follower}>
                <Text style={styles.Gray}> Followers   </Text>
              </TouchableOpacity>
            </View>
          </View>


        </ScrollView>

      </View>
    );
  }
}
