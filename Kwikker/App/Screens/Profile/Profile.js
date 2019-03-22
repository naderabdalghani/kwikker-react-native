import React, { Component } from 'react';
import { Text, View } from 'react-native';
import ProfileHeader from '../../Components/ProfileHeader/ProfileHeader'
import TabsNavigator from '../../Components/ProfileTabs/TabsNavigator'

export default class Profile extends Component
{

  constructor(props) {
    super(props);
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
        <View style={{ flex: 1}}>
          <ProfileHeader
            ref={ref => this.feedback = ref}
              Following={this.Following.bind(this)}
              Follower={this.Follower.bind(this)}
              EditProfile={this.EditProfile.bind(this)}
          
          
          ></ProfileHeader>
          <TabsNavigator></TabsNavigator>
        </View>
    );
  }
}

