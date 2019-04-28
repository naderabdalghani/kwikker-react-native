import React, { Component } from 'react';
import { Text, View, ScrollView, TouchableOpacity, Image, TextInput, RefreshControl } from 'react-native';
import Kweek from '../Kweek/Kweek';
/** @module Mentions **/

export default class Mentions extends React.Component {
  /** to render unseend Mentions.
   * @memberof Mentions
 */
  renderUnseen(index) {
    if (index < this.props.screenProps.unseenCountMentions) { return { backgroundColor: '#f2f2f2' }; }

    return (null);
  }

  render() {
    return (
      <ScrollView
        refreshControl={(
          <RefreshControl
            refreshing={this.props.screenProps.refreshing}
            onRefresh={this.props.screenProps.pullRefresh}
          />
)}
        style={{ flex: 1 }}
        onScroll={({ nativeEvent }) => { this.props.screenProps.moreMentions(nativeEvent); }}
      >
        {this.props.screenProps.mentions.map((item, index) => (
          <TouchableOpacity
            style={
            this.renderUnseen(index)
          }
            key={item.id}
            onPress={() => {
            }}
          >
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
              replyTo={item.reply_to}
            />
          </TouchableOpacity>
        ))
      }


      </ScrollView>
    );
  }
}