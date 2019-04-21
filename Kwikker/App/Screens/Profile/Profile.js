import React, { Component } from 'react';
import { Text, View, TouchableNativeFeedback, Image, TouchableOpacity, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import ProfileHeader from '../../Components/ProfileHeader/ProfileHeader';
import TabsNavigator from '../../Components/ProfileTabs/TabsNavigator';
import styles from './Styles';

const {
  indicator,
  indicatorActive,
  indicatorInActive,
  tabLable,
  tabLableActive,
  tabLableInActive,
  tabContent,
  tabContentContainer,
} = styles;

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = { username: '', kweeks: true, replies: false, likes: false, media: false };
  }

  componentDidMount() {
    AsyncStorage.getItem('@app:id').then((id) => {
      this.setState({ username: id });
    });
  }

  tabContent() {
    if (this.state.kweeks) {
      return (
        <View style={tabContentContainer}>
          <Text style={tabContent}>
            Your Kweeks will show
          </Text>
          <Text style={tabContent}>
          up here
          </Text>
        </View>
      );
    }
    if (this.state.replies) {
      return (
        <View style={tabContentContainer}>
          <Text style={tabContent}>
            Your Kweeks will show
          </Text>
          <Text style={tabContent}>
          up here
          </Text>
        </View>
      );
    }
    if (this.state.media) {
      return (
        <View style={tabContentContainer}>
          <Text style={tabContent}>
            Photos and videos
          </Text>
          <Text style={tabContent}>
            thay you kweek will be
          </Text>
          <Text style={tabContent}>
            collected here
          </Text>
        </View>
      );
    }
    return (
      <View style={tabContentContainer}>
        <Text style={tabContent}>
          No likes
        </Text>
      </View>
    );
  }

  kweeks() {
    this.setState({ kweeks: true, replies: false, likes: false, media: false });
  }

  replies() {
    this.setState({ kweeks: false, replies: true, likes: false, media: false });
  }

  media() {
    this.setState({ kweeks: false, replies: false, likes: false, media: true });
  }

  likes() {
    this.setState({ kweeks: false, replies: false, likes: true, media: false });
  }

  Follower() {
    this.props.navigation.push('FollowerList');
  }

  Following() {
    this.props.navigation.push('FollowingList');
  }

  EditProfile() {
    this.props.navigation.push('EditProfileNavigator');
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={styles.bbcontainer}>
          <TouchableNativeFeedback onPress={() => this.props.navigation.goBack(null)}>
            <Image
              style={styles.backButton}
              source={require('./../../Assets/Images/black_back_button.png')}
            />
          </TouchableNativeFeedback>
        </View>
        <ScrollView>
          <ProfileHeader
            ref={(ref) => { this.feedback = ref; }}
            Following={this.Following.bind(this)}
            Follower={this.Follower.bind(this)}
            EditProfile={this.EditProfile.bind(this)}
            username={this.state.username}
          />


          <View style={styles.fackTabContainer}>
            <TouchableOpacity style={styles.fackTab} onPress={this.kweeks.bind(this)}>
              <Text style={[tabLable, this.state.kweeks ? tabLableActive : tabLableInActive]}>
                Kweeks
              </Text>
              <View style={[indicator, this.state.kweeks ? indicatorActive : indicatorInActive]} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.fackTab} onPress={this.replies.bind(this)}>
              <Text style={[tabLable, this.state.replies ? tabLableActive : tabLableInActive]}>
                Replies
              </Text>
              <View style={[indicator, this.state.replies ? indicatorActive : indicatorInActive]} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.fackTab} onPress={this.media.bind(this)}>
              <Text style={[tabLable, this.state.media ? tabLableActive : tabLableInActive]}>
                Media
              </Text>
              <View style={[indicator, this.state.media ? indicatorActive : indicatorInActive]} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.fackTab} onPress={this.likes.bind(this)}>
              <Text style={[tabLable, this.state.likes ? tabLableActive : tabLableInActive]}>
                Likes
              </Text>
              <View style={[indicator, this.state.likes ? indicatorActive : indicatorInActive]} />
            </TouchableOpacity>
          </View>
          <View style={styles.line} />

          <View style={{ alignItems: 'center', alignContent: 'center' }}>
            {this.tabContent()}
          </View>
        </ScrollView>
      </View>
    );
  }
}
