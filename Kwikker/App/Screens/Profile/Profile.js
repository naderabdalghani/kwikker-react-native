import React, { Component } from 'react';
import { Text, View } from 'react-native';
import ProfileHeader from '../../Components/ProfileHeader/ProfileHeader';
import TabsNavigator from '../../Components/ProfileTabs/TabsNavigator';

export default class Profile extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <ProfileHeader />
        <TabsNavigator />
      </View>
    );
  }
}
