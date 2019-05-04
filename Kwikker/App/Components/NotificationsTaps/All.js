import React, { Component } from 'react';
import { ScrollView, RefreshControl, TouchableOpacity } from 'react-native';
import axios from 'axios';
import Notification from '../Notification/Notification';

/** @module All **/

export default class All extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notifClicked: false,
      refreshing: false,
    };
  }

  componentDidMount() {
    this.willFocusListener = this.props.screenProps.rootNav.addListener(
      'willFocus',
      () => {
        this.setState({ notifClicked: false, refreshing: false });
      }
    );
  }

  /** go to profile or kweek on press
   * @memberof All
 */
  navProfileOrKweek(item) {
    if (!this.state.notifClicked) {
      this.setState({ notifClicked: true, refreshing: true }, () => {
        if (item.type === 'LIKE' || item.type === 'REKWEEK' || item.type === 'REPLY') {
          axios.get('kweeks/', {
            params: {
              id: item.kweek_id
            }
          })
            .then((response) => {
              this.props.screenProps.rootNav.push('KweekExtendedView', {
                id: response.data.kweek.id,
                date: response.data.kweek.created_at,
                profileImageUrl: response.data.kweek.user.profile_image_url,
                screenName: response.data.kweek.user.screen_name,
                userName: response.data.kweek.user.username,
                numberOfLikes: response.data.kweek.number_of_likes,
                numberOfRekweeks: response.data.kweek.number_of_rekweeks,
                numberOfReplies: response.data.kweek.number_of_replies,
                kweetText: response.data.kweek.text,
                liked: response.data.kweek.liked_by_user,
                rekweeked: response.data.kweek.rekweeked_by_user,
                rekweekerUserName: response.data.kweek.rekweek_info,
                mediaUrl: response.data.kweek.media_url,
                replyTo: response.data.kweek.reply_info,
                following: response.data.kweek.user.following,
                mentions: response.data.kweek.mentions,
                hashtags: response.data.kweek.hashtags
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
        if (item.type === 'FOLLOW') {
          this.props.screenProps.rootNav.push('Profile', {
            username: item.username,
          });
        }
      });
    }
  }

  /** to render unseend messges.
   * @memberof All
 */
  renderUnseen(index) {
    if (index < this.props.screenProps.unseenCount) { return { backgroundColor: '#f2f2f2' }; }

    return (null);
  }

  render() {
    return (
      <ScrollView
        refreshControl={(
          <RefreshControl
            refreshing={(this.props.screenProps.refreshing || this.state.refreshing)}
            onRefresh={this.props.screenProps.pullRefresh}
          />
)}
        style={{ flex: 1 }}
        onScroll={({ nativeEvent }) => { this.props.screenProps.moreNotifications(nativeEvent); }}
      >
        {this.props.screenProps.notifications.map((item, index) => (
          <TouchableOpacity
            style={
              this.renderUnseen(index)
            }
            key={item.id}
            onPress={() => {
              this.navProfileOrKweek(item);
            }}
          >
            <Notification
              key={item.id}
              profileUrl={item.profile_pic_url}
              kweekText={item.kweek_text}
              type={item.type}
              screenName={item.screen_name}
              userName={item.username}
              rootNav={this.props.screenProps.rootNav}
            />
          </TouchableOpacity>
        ))
        }


      </ScrollView>
    );
  }
}