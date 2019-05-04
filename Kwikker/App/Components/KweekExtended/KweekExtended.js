import React, { Component } from 'react';
import { Thumbnail, Container, Header, Content } from 'native-base';
import { Text, View, TouchableOpacity, Image, Button, StyleSheet, TextInput } from 'react-native';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import ParsedText from 'react-native-parsed-text';
import { ActionSheetCustom as ActionSheet } from 'react-native-actionsheet';
import AsyncStorage from '@react-native-community/async-storage';
import styles from './Styles';

/** @module Kweek **/
export default class Kweek extends Component {
  constructor(props) {
    super(props);
    this.state = { loggedUser: '', liked: this.props.liked, rekeeked: this.props.rekweeked, likesCounter: this.props.numberOfLikes, rekweeksCounter: this.props.numberOfRekweeks };
    AsyncStorage.getItem('@app:id').then((id) => {
      this.setState({ loggedUser: id });
    });
  }

  /**
   * determine options to be shown in kweek menu
   */
  getOPtions() {
    if (this.props.userName === this.state.loggedUser) return (['Cancle', 'Delete Kweek']);
    if (this.props.following === true) return (['Cancle', 'Unfollow @'.concat(this.props.userName), 'Mute @'.concat(this.props.userName), 'Block @'.concat(this.props.userName)]);
    return (['Cancle', 'Follow @'.concat(this.props.userName), 'Mute @'.concat(this.props.userName), 'Block @'.concat(this.props.userName)]);
  }

  /**
   * determine whether the text after @ is mention or not
   */
  getMentions() {
    if (this.props.mentions.length !== 0) {
      const expStr = '@'.concat(this.props.mentions[0].username);
      for (let i = 1; i < this.props.mentions.length; i++) {
        expStr.concat('|@').concat(this.props.mentions[i].username);
      }
      return (RegExp(expStr));
    }
    return (RegExp('@hkhkahfiusvhhvuifhvushspaigupsirguahvhbuadhoutuhfdhbl'));
  }

  /**
   * open kweek menu
   */
  showActionSheet = () => {
    this.ActionSheet.show();
  }

  /**
   * navigate to search hashtag on press
   * @param {string} text - hashtag text
   */
  goToHashtag(text) {
    const arr = [];
    for (let i = 0; i < this.props.hashtags.length; i++) {
      arr[i] = this.props.hashtags[i].text;
    }
    const j = arr.indexOf(text);
    const hashtag = this.props.hashtags[j];
    this.props.navigation.push('SearchBar', { search: hashtag.text, trendId: hashtag.id });
  }

  /**
   * handle block press from kweek menu
   */
  block() {
    axios.post('interactions/blocks', {
      username: this.props.userName
    })
      .then((response) => {
        console.log(response.status);
        //this.props.navigation.navigate('Home');
      })

      .catch((err) => {
      // handle error
        let error = JSON.stringify(err);
        error = JSON.parse(error);
        console.log(error);
        console.log(error.response.status);
      });
  }

  /**
   * handle follow press from kweek menu
   */
  follow() {
    axios.post('interactions/follow', {
      username: this.props.userName
    })
      .then((response) => {
      })
      .catch((error) => {
      });
  }

  /**
 * handle unfollow press from kweek menu */
  unfollow() {
    axios.delete('interactions/follow', {
      params: {
        username: this.props.userName
      }
    })
      .then((response) => {
      })
      .catch((error) => {
      });
  }

  /**
   * handle pressed button in kweek menu
   * @param {int} index - index of button pressed
   */
  handleMenu(index) {
    if (index === 1 && this.props.userName === this.state.loggedUser) {
      console.log('updateKweeks');
      axios.delete('kweeks/', {
        params: {
          id: this.props.id
        }
      })
        .then((response) => {
          console.log(response.status);
        })
        .catch((error) => {
        // handle error
          console.log('delete tweets error');
        })
        .then(() => {
        // always executed

        });
    }
    if (index === 1 && this.props.following) {
      this.unfollow();
    }
    if (index === 1 && !this.props.following) {
      this.follow();
    }
    if (index === 2) {
      axios.post('interactions/mutes', {
        username: this.props.userName
      })
        .then((response) => {
          console.log(response.status);
          //this.props.navigation.navigate('Home');
        })

        .catch((err) => {
        // handle error
          let error = JSON.stringify(err);
          error = JSON.parse(error);
          console.log(error);
          console.log(error.response.status);
        })
        .then(() => {
        // always executed
          //this.props.navigation.navigate('Home');
        });
    }
    if (index === 3) {
      this.block();
    }
  }
  /**
   * Calculate kweek date and time
   */
  dateAndTime() {
    const now = new Date();
    const months = [' Jan', ' Feb', ' Mar', ' Apr', ' May', ' Jun', ' Jul', ' Aug', ' Sep', ' Oct', ' Nov', ' Dec'];
    const dateTime = new Date(this.props.date);
    const day = dateTime.getDate();
    const year = dateTime.getFullYear();
    const month = dateTime.getMonth();
    let hour = dateTime.getHours();
    const minutes = dateTime.getMinutes();
    let time = '';
    if (hour >= 12) {
      if (hour === 12) {
        time = hour.toString().concat(':').concat(minutes.toString()).concat(' pm');
      } else {
        time = (hour - 12).toString().concat(':').concat(minutes.toString()).concat(' pm');
      }
    } else {
      if (hour === 0) {
        hour = 12;
      }
      time = hour.toString().concat(':').concat(minutes.toString()).concat(' am');
    }

    return (time.concat(' . ').concat(day.toString()).concat(months[month]).concat(' ')
      .concat(year.toString()));
  }

  /**
   * Determine if it is a kweek shared by a followed user or it is rekweeked by him
   */
  kweekHeader() {
    if (this.props.rekweekerUserName === null) {
      return (null);
    }
    if (this.props.rekweekerUserName.rekweeker_username === this.state.loggedUser) {
      return (
        <TouchableOpacity style={{ marginTop: '2%', marginBottom: '-2%' }}>
          <View style={{ flexDirection: 'row' }}>
            <EvilIcons name="retweet" size={16} color="#657786" style={{ marginLeft: '15%', marginTop: '1%' }} />
            <Text style={{ color: '#657786', marginLeft: '3%' }}>You rekweeked</Text>
          </View>
        </TouchableOpacity>
      );
    }
    return (
      <TouchableOpacity onPress={() => this.props.navigation.push('Profile', { username: this.props.rekweekerUserName.rekweeker_username })} style={{ marginTop: '2%', marginBottom: '-2%' }}>
        <View style={{ flexDirection: 'row' }}>
          <EvilIcons name="retweet" size={16} color="#657786" style={{ marginLeft: '15%', marginTop: '1%' }} />
          <Text style={{ color: '#657786', marginLeft: '3%' }}>{this.props.rekweekerUserName.rekweeker_username} rekweeked</Text>
        </View>
      </TouchableOpacity>
    );
  }

  /**
  * Determine whether the kweek is liked by the user or not
  */
  likeStatus() {
    if (this.state.liked) {
      return (
        <TouchableOpacity onPress={this.likePressed.bind(this)} style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
          <Ionicons name="ios-heart" size={18} color="#FF0000" />
        </TouchableOpacity>
      );
    }
    return (
      <TouchableOpacity onPress={this.likePressed.bind(this)} style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
        <Ionicons name="ios-heart-empty" size={18} color="#657786" />
      </TouchableOpacity>
    );
  }

  /**
   * Determine whether the kweek is rekweeked by the user or not
   */
  rekweekStatus() {
    if (this.state.rekeeked) {
      return (
        <TouchableOpacity onPress={this.rekweekPressed.bind(this)} style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
          <EvilIcons name="retweet" size={28} color="#009900" />
        </TouchableOpacity>
      );
    }
    return (
      <TouchableOpacity onPress={this.rekweekPressed.bind(this)} style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
        <EvilIcons name="retweet" size={28} color="#657786" />
      </TouchableOpacity>
    );
  }

  /**
   * Handle like button press by changing the button color and changing the counter
   */
  likePressed() {
    console.log('like pressed');
    if (this.state.liked) {
      this.setState({ liked: false });
      this.setState((prevState) => ({ likesCounter: prevState.likesCounter - 1 }));
      axios.delete('kweeks/like', {
        params: {
          id: this.props.id
        }
      })
        .then((response) => {
          console.log(response.status);
        })

        .catch((error) => {
        // handle error
          console.log(error);
        })
        .then(() => {
        // always executed
        });
    } else {
      this.setState({ liked: true });
      this.setState((prevState) => ({ likesCounter: prevState.likesCounter + 1 }));
      axios.post('kweeks/like', {
        id: this.props.id
      })
        .then((response) => {
          console.log(response.status);
        })

        .catch((error) => {
        // handle error
        // console.log(error);
        })
        .then(() => {
        // always executed
        });
    }
  }

  /**
   * Handle rekweek button press by changing button color and changing counter
   */
  rekweekPressed() {
    console.log('rekweek pressed');
    if (this.state.rekeeked) {
      console.log('already rekweeked');
      this.setState({ rekeeked: false });
      this.setState((prevState) => ({ rekweeksCounter: prevState.rekweeksCounter - 1 }));
      axios.delete('kweeks/rekweek', {
        params: {
          id: this.props.id
        }
      })
        .then((response) => {
          console.log(response.status);
        })

        .catch((err) => {
        // handle error
          console.log('unrekweek error');
          //console.log(error);
          let error = JSON.stringify(err);
          error = JSON.parse(error);
          console.log(error);
          console.log(error.response.status);
        })
        .then(() => {
        // always executed
        });
    } else {
      console.log('was not rekweeked');
      this.setState({ rekeeked: true });
      this.setState((prevState) => ({ rekweeksCounter: prevState.rekweeksCounter + 1 }));
      axios.post('kweeks/rekweek', {
        id: this.props.id
      })
        .then((response) => {
          console.log(response.status);
        })

        .catch((err) => {
        // handle error
          //console.log(error);
          console.log('rekweek error');
          let error = JSON.stringify(err);
          error = JSON.parse(error);
          console.log(error);
          console.log(error.response.status);
        })
        .then(() => {
        // always executed
        });
    }
  }

  render() {
    console.log(this.props.mentions);
    const url = 'http://www.personalbrandingblog.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png';
    return (
      <View style={{ borderBottomWidth: 0.5, borderBottomColor: '#AAB8C2' }}>
        {this.kweekHeader()}
        <TouchableOpacity style={{ marginLeft: '3%', marginTop: '3%' }}>
          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity onPress={() => this.props.navigation.push('Profile', { username: this.props.userName })} style={{ flex: 1 }}>
              <Thumbnail source={{ uri: this.props.profileImageUrl }} />
            </TouchableOpacity>
            <View style={{ flex: 4, flexDirection: 'column', marginTop: '1.5%' }}>
              <View style={{ flexDirection: 'row' }}>
                <View style={{ flex: 8, flexDirection: 'row' }}>
                  <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#000000' }}>{this.props.screenName}</Text>
                </View>
                <TouchableOpacity style={{ flex: 1 }} onPress={this.showActionSheet}>
                  <Ionicons name="ios-arrow-down" size={15} color="#657786" />
                </TouchableOpacity>
              </View>
              <Text style={{ fontSize: 16, color: '#657786', marginTop: '1%' }}>@{this.props.userName}</Text>
            </View>
          </View>
          <View style={{ marginTop: '3%' }}>
            {this.props.replyTo === null ? null : (
              <View styles={{ flexDirection: 'row', marginBottom: '2%' }}>
                <Text style={{ fontSize: 15, color: '#657786' }}>Replying to
                  <Text onPress={() => this.props.navigation.push('Profile', { username: this.props.replyTo.reply_to_username })} style={styles.hashtag}> @{this.props.replyTo.reply_to_username}</Text>
                </Text>
              </View>
            )}
            <ParsedText
              parse={[
                { pattern: /#(\w+)/, style: styles.hashtag, onPress: (text) => this.goToHashtag(text) },
                { pattern: this.getMentions(), style: styles.hashtag, onPress: (name, index) => this.props.navigation.push('Profile', { username: name.substr(1) }) }
              ]}
              style={{ fontSize: 16, color: '#000000' }}
              childrenProps={{ allowFontScaling: false }}
            >
              {this.props.kweetText}
            </ParsedText>
            { this.props.mediaUrl === null ? null : (
              <TouchableOpacity style={{ height: 300, width: '97%', marginBottom: '6%', marginTop: '2%', borderWidth: 1, borderColor: '#AAB8C2', borderRadius: 5 }}>
                <Image source={{ uri: this.props.mediaUrl }} style={{ height: '100%', width: '100%' }} />
              </TouchableOpacity>
            )}
          </View>
        </TouchableOpacity>
        <View style={{ flexDirection: 'row', marginBottom: '2%', borderBottomWidth: 0.5, borderBottomColor: '#AAB8C2' }}>
          <Text style={{ color: '#657786', fontSize: 16, marginLeft: '3%', paddingBottom: '2%', paddingTop: '8%' }}>{this.dateAndTime()}</Text>
        </View>
        {this.state.likesCounter === 0 && this.state.rekweeksCounter === 0 ? null : (
          <View style={{ flexDirection: 'row', marginBottom: '2%', borderBottomWidth: 0.5, borderBottomColor: '#AAB8C2', paddingBottom: '2%' }}>
            {this.state.rekweeksCounter === 0 ? null : (
              <TouchableOpacity onPress={() => this.props.navigation.push('Rekweekers', { kweekId: this.props.id })} style={{ marginLeft: '3%', marginRight: '6%' }}>
                <Text style={{ fontSize: 16, color: '#000000', fontWeight: 'bold' }}>{this.state.rekweeksCounter}
                  <Text style={{ color: '#657786', fontWeight: 'normal' }}> Rekweets</Text>
                </Text>
              </TouchableOpacity>
            )}
            {this.state.likesCounter === 0 ? null : (
              <TouchableOpacity onPress={() => this.props.navigation.push('Likers', { kweekId: this.props.id })} style={{ marginLeft: '3%' }}>
                <Text style={{ fontSize: 16, color: '#000000', fontWeight: 'bold' }}>{this.state.likesCounter}
                  <Text style={{ color: '#657786', fontWeight: 'normal' }}> Likes</Text>
                </Text>
              </TouchableOpacity>
            )}
          </View>
        )}
        <View style={{ flexDirection: 'row', marginBottom: '2%' }}>
          <TouchableOpacity onPress={() => this.props.navigation.push('CreateTweet', { kweekId: this.props.id, user: this.props.userName })} style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
            <EvilIcons name="comment" size={26} color="#657786" />
          </TouchableOpacity>
          {this.rekweekStatus()}
          {this.likeStatus()}
        </View>
        <ActionSheet
          ref={(o) => this.ActionSheet = o}
          options={this.getOPtions()}
          cancelButtonIndex={0}
          //destructiveButtonIndex={1}
          onPress={(index) => { this.handleMenu(index); }}
        />
      </View>
    );
  }
}