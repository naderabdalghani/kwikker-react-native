import React, { Component } from 'react';
import { Text, View, ScrollView, TouchableOpacity, Image, TextInput, RefreshControl } from 'react-native';
import UserInSearch from '../UserInSearch/UserInSearch';

/** @module People **/

export default class People extends React.Component {
  render() {
    return (
      <ScrollView
        refreshControl={(
          <RefreshControl
            enabled={false}
            refreshing={this.props.screenProps.refreshing}
          />
)} onScroll={({ nativeEvent }) => { this.props.screenProps.moreLists(nativeEvent); }} style={{ flex: 1 }}
      >
        {this.props.screenProps.users.map((item, index) => (
          <TouchableOpacity key={item.username}>
            <UserInSearch
              key={item.username}
              profileUrl={item.profile_image_url}
              userName={item.username}
              screenName={item.screen_name}
              following={item.following}
              followsYou={item.follows_you}
              blocked={item.blocked}
              muted={item.muted}
            />
          </TouchableOpacity>
        ))
        }

      </ScrollView>
    );
  }
}