import React, { Component } from 'react';
import { Text, View, ScrollView, TouchableOpacity, Image, TextInput, RefreshControl } from 'react-native';
import Kweek from '../Kweek/Kweek';

/** @module Kweeks **/

export default class Kweeks extends React.Component {
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
        {/* {this.props.screenProps.kweeks.map((item, index) => (
          <TouchableOpacity key={item.username}>
            <Kweek
              key={item.id}
              id={item.id}
              date={item.created_at}
              profileImageUrl={item.user.profile_image_url}
              screenName={item.user.screen_name}
              userName={item.user.username}
              numberOfLikes={item.number_of_likes}
              numberOfRekweeks={item.number_of_rekweeks}
              numberOfReplies={item.number_of_replies}
              kweetText={item.text}
              liked={item.liked_by_user}
              rekweeked={item.rekweeked_by_user}
              rekweekerUserName={item.rekweek_info}
              mediaUrl={item.media_url}
            />
          </TouchableOpacity>
        ))
        } */}

      </ScrollView>
    );
  }
}