import React, { Component } from 'react';
import { Thumbnail, ToastAndroid, Container, Header, Content } from 'native-base';
import { Text, View, TouchableOpacity, Image, Button, StyleSheet, TextInput } from 'react-native';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import ParsedText from 'react-native-parsed-text';
import { ActionSheetCustom as ActionSheet } from 'react-native-actionsheet';
import AsyncStorage from '@react-native-community/async-storage';
import styles from './Styles';

export default class Kweek extends Component {
  constructor(props) {
    super(props);
    this.state = { loggedUser: '', liked: this.props.liked, rekeeked: this.props.rekweeked, likesCounter: this.props.numberOfLikes, rekweeksCounter: this.props.numberOfRekweeks };
    AsyncStorage.getItem('@app:id').then((id) => {
      this.setState({ loggedUser: id });
    });
  }

  getOPtions() {
    if (this.props.userName === this.state.loggedUser) return (['Delete Kweek']);
    if (this.props.following === true) return (['Unfollow @'.concat(this.props.userName), 'Mute @'.concat(this.props.userName), 'Block @'.concat(this.props.userName)]);
    return (['Follow @'.concat(this.props.userName), 'Mute @'.concat(this.props.userName), 'Block @'.concat(this.props.userName)]);
  }

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

  showActionSheet = () => {
    this.ActionSheet.show();
  }

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

  follow() {
    axios.post('interactions/follow', {
      username: this.props.userName
    })
      .then((response) => {
      })
      .catch((error) => {
      });
  }

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


  handleMenu(index) {
    if (index === 0 && this.props.userName === this.state.loggedUser) {
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
    if (index === 0 && this.props.following) {
      this.unfollow();
    }
    if (index === 0 && !this.props.following) {
      this.follow();
    }
    if (index === 1) {
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
    if (index === 2) {
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
    const hour = dateTime.getHours();
    const minutes = dateTime.getMinutes();
    if (now.getFullYear() === year && now.getMonth() === month && now.getDate() === day && now.getHours() === hour) { return ((now.getMinutes() - minutes).toString().concat('m')); }
    if (now.getFullYear() === year && now.getMonth() === month && now.getDate() === day) { return ((now.getHours() - hour).toString().concat('h')); }
    if (now.getFullYear() === year) { return ((day).toString().concat(months[month])); }
    return ((months[month]).concat(' ').concat(year.toString()));
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
      <TouchableOpacity style={{ marginTop: '2%', marginBottom: '-2%' }}>
        <View style={{ flexDirection: 'row' }}>
          <EvilIcons name="retweet" size={16} color="#657786" style={{ marginLeft: '15%', marginTop: '1%' }} />
          <Text style={{ color: '#657786', marginLeft: '3%' }}>{this.props.rekweekerUserName.rekweeker_username} rekweeked</Text>
        </View>
      </TouchableOpacity>
    );
  }
  /* if (this.props.likerUserName != null) {
      return (
        <TouchableOpacity style={{ marginTop: '2%', marginBottom: '1%' }}>
          <View style={{ flexDirection: 'row' }}>
            <Ionicons name="ios-heart" size={11} color="#657786" style={{ marginLeft: '15%', marginTop: '1%' }} />
            <Text style={{ color: '#657786', marginLeft: '4.5%' }}>{this.props.likerUserName} liked</Text>
          </View>
        </TouchableOpacity>
      );
    }
    */

  /**
  * Determine whether the kweek is liked by the user or not
  */
  likeStatus() {
    if (this.state.liked) {
      return (
        <TouchableOpacity onPress={this.likePressed.bind(this)} style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
          <Ionicons name="ios-heart" size={18} color="#FF0000" />
          <Text style={{ marginLeft: '3%' }}>{this.state.likesCounter === 0 ? null : this.state.likesCounter }</Text>
        </TouchableOpacity>
      );
    }
    return (
      <TouchableOpacity onPress={this.likePressed.bind(this)} style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
        <Ionicons name="ios-heart-empty" size={18} color="#657786" />
        <Text style={{ marginLeft: '3%' }}>{this.state.likesCounter === 0 ? null : this.state.likesCounter }</Text>
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
          <Text>{this.state.rekweeksCounter === 0 ? null : this.state.rekweeksCounter }</Text>
        </TouchableOpacity>
      );
    }
    return (
      <TouchableOpacity onPress={this.rekweekPressed.bind(this)} style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
        <EvilIcons name="retweet" size={28} color="#657786" />
        <Text>{this.state.rekweeksCounter === 0 ? null : this.state.rekweeksCounter }</Text>
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
        // console.log(error);
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

        .catch((error) => {
        // handle error
          console.log('unrekweek error');
          console.log(error);
        })
        .then(() => {
        // always executed
        });
    } else {
      this.setState({ rekeeked: true });
      this.setState((prevState) => ({ rekweeksCounter: prevState.rekweeksCounter + 1 }));
      axios.post('kweeks/rekweek', {
        id: this.props.id
      })
        .then((response) => {
          console.log(response.status);
        })

        .catch((error) => {
        // handle error
          console.log(error);
          console.log('rekweek error');
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
        <TouchableOpacity
          onPress={() => this.props.navigation.push('KweekExtendedView', {
            //key: this.props.key,
            id: this.props.id,
            date: this.props.date,
            profileImageUrl: this.props.profileImageUrl,
            screenName: this.props.screenName,
            userName: this.props.userName,
            numberOfLikes: this.props.numberOfLikes,
            numberOfRekweeks: this.props.numberOfRekweeks,
            numberOfReplies: this.props.numberOfReplies,
            kweetText: this.props.kweetText,
            liked: this.props.liked,
            rekweeked: this.props.rekweeked,
            rekweekerUserName: this.props.rekweekerUserName,
            mediaUrl: this.props.mediaUrl,
            replyTo: this.props.replyTo,
            following: this.props.following,
            mentions: this.props.mentions
          })} style={{ marginLeft: '3%', marginTop: '3%' }}
        >
          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity style={{ flex: 1 }}>
              <Thumbnail source={{ uri: url }} />
            </TouchableOpacity>
            <View style={{ flex: 4, flexDirection: 'column' }}>
              <View style={{ flexDirection: 'row' }}>
                <View style={{ flex: 8, flexDirection: 'row' }}>
                  <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#000000' }}>{this.props.screenName}</Text>
                  <Text style={{ fontSize: 15, color: '#657786', marginLeft: '2%' }}>@{this.props.userName}</Text>
                  <Text style={{ fontSize: 15, color: '#657786', marginLeft: '2%' }}>{ this.dateAndTime() }</Text>
                </View>
                <TouchableOpacity style={{ flex: 1 }} onPress={this.showActionSheet}>
                  <Ionicons name="ios-arrow-down" size={15} color="#657786" />
                </TouchableOpacity>
              </View>
              {this.props.replyTo === null ? null : (
                <View styles={{ flexDirection: 'row' }}>
                  <Text style={{ fontSize: 15, color: '#657786' }}>Replying to
                    <Text style={styles.hashtag}> @{this.props.userName}</Text>
                  </Text>
                </View>
              )}
              <ParsedText
                parse={[
                  { pattern: /#(\w+)/, style: styles.hashtag },
                  { pattern: this.getMentions(), style: styles.hashtag }
                ]}
                style={{ fontSize: 15, color: '#000000' }}
                childrenProps={{ allowFontScaling: false }}
              >
                {this.props.kweetText}
              </ParsedText>
              { this.props.mediaUrl === null ? null : (
                <TouchableOpacity style={{ height: 200, width: '80%', marginTop: '2%', borderWidth: 1, borderColor: '#AAB8C2', borderRadius: 5 }}>
                  <Image source={{ uri: this.props.mediaUrl }} style={{ height: '100%', width: '100%' }} />
                </TouchableOpacity>
              )}
            </View>
          </View>
        </TouchableOpacity>
        <View style={{ flexDirection: 'row', marginTop: '3%', marginBottom: '3%' }}>
          <TouchableOpacity onPress={() => this.props.navigation.push('CreateTweet', { kweekId: this.props.id, user: this.props.userName })} style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
            <EvilIcons name="comment" size={26} color="#657786" />
            <Text>{this.props.numberOfReplies === 0 ? null : this.props.numberOfReplies}</Text>
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