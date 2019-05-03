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
      replies: null,
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
    const ids = navigation.getParam('id', null);
    console.log('updateKweeks');
    axios.get('kweeks/', {
      params: {
        id: ids
      }
    })
      .then((response) => {
        console.log(response.data);
        this.setState({
          kweek: response.data.kweek,
          replies: response.data.replies
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
    console.log('render');
    return (
      this.state.kweek === null ? (<View />) : (
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
            <KweekExtended
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
              />
            ))
          }
          </ScrollView>
        </View>
      )
    );
  }
}