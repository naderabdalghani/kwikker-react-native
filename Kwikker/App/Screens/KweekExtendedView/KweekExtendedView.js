import React, { Component } from 'react';
import { Text, View, Image, ScrollView, TouchableOpacity, RefreshControl } from 'react-native';
import axios from 'axios';
import { DrawerActions } from 'react-navigation';
import Kweek from '../../Components/Kweek/Kweek';
import KweekExtended from '../../Components/KweekExtended/KweekExtended';

/** @module KweekExtendedView **/
export default class KweekExtendedView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      kweek: null,
      replies: [],
      refreshing: false
    };
    console.log('constructor');
    //this.pullRefresh();
  }

  componentDidMount() {
    this.pullRefresh();
    console.log('componentdidMount');
  }

  /**
   * pull refresh functionality
   */
  pullRefresh=() => {
    console.log('pullRefresh');
    this.setState({
      refreshing: true,
    });
    console.log(this.state.refreshing);
    this.updateKweeks();
  }

  /**
   * update kweek with replies
   */
  updateKweeks() {
    const { navigation } = this.props;
    const replyToId = navigation.getParam('replyTo', null);
    const kweekId = navigation.getParam('id', null);
    console.log('updateKweeks');
    if (replyToId !== null) {
      axios.get('kweeks/kweek_only', {
        params: {
          id: replyToId.reply_to_kweek_id
        }
      })
        .then((response) => {
          console.log(response.data);
          this.setState({
            kweek: response.data,
          //replies: response.data.replies
          });
          this.setState({ refreshing: false });
        })
        .catch((error) => {
          // handle error
          console.log('get tweets error');
        })
        .then(() => {
          // always executed
        });
    }
    axios.get('kweeks/replies', {
      params: {
        reply_to: kweekId
      }
    })
      .then((response) => {
        console.log(response.data);
        this.setState({
          replies: response.data,
          //replies: response.data.replies
        });
        this.setState({ refreshing: false });
      })
      .catch((error) => {
        // handle error
        console.log('get tweets error');
      })
      .then(() => {
        // always executed
      });
  }

  render() {
    const { navigation } = this.props;
    const key = navigation.getParam('id', null);
    const id = navigation.getParam('id', null);
    const date = navigation.getParam('date', null);
    const profileImageUrl = navigation.getParam('profileImageUrl', null);
    const screenName = navigation.getParam('screenName', null);
    const userName = navigation.getParam('userName', null);
    const numberOfLikes = navigation.getParam('numberOfLikes', null);
    const numberOfRekweeks = navigation.getParam('numberOfRekweeks', null);
    const numberOfReplies = navigation.getParam('numberOfReplies', null);
    const kweetText = navigation.getParam('kweetText', null);
    const liked = navigation.getParam('liked', null);
    const rekweeked = navigation.getParam('rekweeked', null);
    const rekweekerUserName = navigation.getParam('rekweekerUserName', null);
    const mediaUrl = navigation.getParam('mediaUrl', null);
    const replyTo = navigation.getParam('replyTo', null);
    const following = navigation.getParam('following', null);
    const mentions = navigation.getParam('mentions', null);
    const hashtags = navigation.getParam('hashtags', null);
    console.log('render');
    return (
      <View style={{ flex: 1 }}>
        <ScrollView
          refreshControl={(
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this.pullRefresh}
            />
          )}
          style={{ flex: 1 }}
        >
          {this.state.kweek === null ? null : (
            <Kweek
              key={this.state.kweek.id}
              id={this.state.kweek.id}
              date={this.state.kweek.created_at}
              profileImageUrl={this.state.kweek.user.profile_image_url}
              screenName={this.state.kweek.user.screen_name}
              userName={this.state.kweek.user.username}
              numberOfLikes={this.state.kweek.number_of_likes}
              numberOfRekweeks={this.state.kweek.number_of_rekweeks}
              numberOfReplies={this.state.kweek.number_of_replies}
              kweetText={this.state.kweek.text}
              liked={this.state.kweek.liked_by_user}
              rekweeked={this.state.kweek.rekweeked_by_user}
              rekweekerUserName={this.state.kweek.rekweek_info}
              mediaUrl={this.state.kweek.media_url}
              replyTo={this.state.kweek.reply_info}
              following={this.state.kweek.user.following}
              mentions={this.state.kweek.mentions}
              navigation={this.props.navigation}
              hashtags={this.state.kweek.hashtags}
              refresh={() => this.pullRefresh()}
            />
          )}
          <KweekExtended
            key={id}
            id={id}
            date={date}
            profileImageUrl={profileImageUrl}
            screenName={screenName}
            userName={userName}
            numberOfLikes={numberOfLikes}
            numberOfRekweeks={numberOfRekweeks}
            numberOfReplies={numberOfReplies}
            kweetText={kweetText}
            liked={liked}
            rekweeked={rekweeked}
            rekweekerUserName={rekweekerUserName}
            mediaUrl={mediaUrl}
            replyTo={replyTo}
            following={following}
            mentions={mentions}
            navigation={this.props.navigation}
            hashtags={hashtags}
          />
          {this.state.replies.map((item, index) => (
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
              replyTo={item.reply_info}
              following={item.user.following}
              mentions={item.mentions}
              navigation={this.props.navigation}
              hashtags={item.hashtags}
              refresh={() => this.pullRefresh()}
            />
          ))
          }
        </ScrollView>
      </View>
    );
  }
}