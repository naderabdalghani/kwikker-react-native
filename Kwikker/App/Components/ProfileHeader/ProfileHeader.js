import React from 'react';
import { TouchableOpacity, Text, View, ScrollView, Image, TouchableNativeFeedback, Animated } from 'react-native';
import axios from 'axios';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import styles from './Styles';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      scrollY: new Animated.Value(0),
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
        this.props.updateProfile(this.props.username);
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
      this.props.updateProfile(this.props.username);
    })
      .catch((error) => {
      });
  }

  block() {

  }

  unblock() {
    axios.delete('interactions/blocks', {
      params: {
        username: this.props.username
      }
    })
      .then((response) => {
        this.props.updateProfile(this.props.username);
      })
      .catch((error) => {
        console.log('errrrrrrrrrrrrrror!');
      });
  }

  mute() {

  }

  unmute() {

  }

  isMuted() {
    if (this.props.muted) {
      return (<Image style={{ width: 25, height: 25, }} source={require('../../Assets/Images/mute.png')} />);
    }
    return (<Text />);
  }

  rightButton() {
    if (!this.props.uBlocked) {
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
            onPress={() => { this.unblock(); }}
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
      if (this.props.myProfile) {
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


    return (null);
  }


  youRBlocked() {
    if (!this.props.uBlocked && !this.props.blockedView) {
      return (
        <View style={{ marginLeft: 10, marginTop: 4, }}>
          <Text style={{ fontWeight: 'bold', fontSize: 20, color: '#000', marginRight: 10 }}>
            <Text style={{ color: 'white', fontSize: 0 }}>a</Text>{this.props.screenName}            {this.isMuted()}
          </Text>
          <View style={{ flexDirection: 'row' }}>
            <View style={{ flex: 1, flexDirection: 'row' }}>
              <Text style={styles.Gray}>
                @<Text style={{ color: 'white', fontSize: 0 }}>a</Text>{this.props.username}
              </Text>
              {this.followsYou()}
            </View>
          </View>
          <Text style={{ color: '#000' }}>
            <Text style={{ color: 'white', fontSize: 0 }}>a</Text>{this.props.bio}
          </Text>
          <Text style={styles.Gray}> <Image
            style={styles.dateIcon}
            source={require('./../../Assets/Images/date.png')}
          /> Joined {this.dateAndTime()}
          </Text>
          <Text style={styles.Gray}> <Image style={styles.dateIcon} source={require('./../../Assets/Images/birth.png')} /> date of birth {this.props.birthDate}</Text>

          <View style={{ flex: 1, flexDirection: 'row' }}>
            <Text style={styles.folloerTextStyle}>{this.props.followingCount}</Text>
            <TouchableOpacity onPress={this.props.Following}>
              <Text style={styles.Gray}>Following   </Text>
            </TouchableOpacity>
            <Text style={styles.folloerTextStyle}>{this.props.followersCount}</Text>
            <TouchableOpacity onPress={this.props.Follower}>
              <Text style={styles.Gray}>Followers   </Text>
            </TouchableOpacity>
          </View>
        </View>

      );
    }
    return (
      <View style={{ marginLeft: 10, marginTop: 4 }}>
        <Text style={{ fontWeight: 'bold', fontSize: 20, color: '#000' }}>
          {this.props.screenName}            {this.isMuted()}
        </Text>
        <Text style={styles.Gray}>
        @{this.props.username}
        </Text>

      </View>
    );
  }

  chat() {
    if (this.props.followsYou) {
      return (
        <View style={{ marginTop: 130, marginLeft: '30%', borderSize: 1, borderRadius: 13, borderColor: '#1DA1F2' }}>
          <TouchableOpacity onPress={this.props.conversation}>
            <FontAwesome
              name="envelope-o"
              size={26}
              style={{ color: '#1DA1F2' }}
            />
          </TouchableOpacity>
        </View>
      );
    }
    return (
      <View style={{ marginTop: 120, }}>
        <Text style={{ color: '#fff' }}>a</Text>
      </View>
    );
  }

  followsYou() {
    if (this.props.followsYou) {
      return (
        <View style={{ padding: 3 }}>
          <Text style={{ fontSize: 12, backgroundColor: '#E1E8ED', marginTop: 2 }}>
            Follows you
          </Text>
        </View>
      );
    }
    return (
      null
    );
  }

  dateAndTime() {
    const now = new Date();
    const months = [' Jan', ' Feb', ' Mar', ' Apr', ' May', ' Jun', ' Jul', ' Aug', ' Sep', ' Oct', ' Nov', ' Dec'];
    const dateTime = new Date(this.props.createdAt);
    const year = dateTime.getFullYear();
    const month = dateTime.getMonth();
    const time = '';
    return (time.concat(months[month]).concat(' ').concat(year.toString()));
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
          <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
            <View style={styles.ProfileImageContainer}>
              <Image
                style={styles.ProfileImage}
                source={{ uri: this.props.profileImageUrl }}
              />
            </View>
            {this.chat()}
            {this.rightButton()}
          </View>

          {this.youRBlocked()}


        </ScrollView>

      </View>
    );
  }
}