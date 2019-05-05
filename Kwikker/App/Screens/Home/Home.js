import React, { Component } from 'react';
import { View, Image, ScrollView, TouchableOpacity, RefreshControl } from 'react-native';
import axios from 'axios';
import io from 'socket.io-client';
import PushNotification from 'react-native-push-notification';
import AsyncStorage from '@react-native-community/async-storage';
import { DrawerActions, NavigationActions } from 'react-navigation';
import { withInAppNotification } from 'react-native-in-app-notification/src/index';
import Kweek from '../../Components/Kweek/Kweek';

/** @module Home **/
export class Home extends Component {
  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state;
    return params;
  };

  constructor(props) {
    super(props);
    this.state = {
      kweeks: [],
      currentUsername: '',
      refreshing: false,
    };
    //console.log('constructor');
  }


  componentDidMount() {
    let socket = io('http://kwikkerbackend.eu-central-1.elasticbeanstalk.com', { transports: ['websocket'] });
    socket.connect();
    AsyncStorage.getItem('@app:id').then((id) => {
      this.setState({ currentUsername: id, },);
      socket.on(this.state.currentUsername, (notification) => {
        PushNotification.localNotification({
          message: notification,
        });
        this.props.showNotification({
          title: notification,
          message: ' hi ',
          vibrate: true,
          onPress: () => this.props.navigation.navigate('Notifications')
        });
      });
      axios.get('user/profile', {
        params: {
          username: id
        }
      })
        .then((response) => {
          AsyncStorage.setItem('@app:image', response.data.profile_image_url);
          this.props.navigation.setParams({
            headerLeft: (
              <TouchableOpacity onPress={() => this.props.navigation.dispatch(DrawerActions.openDrawer())}>
                <Image source={{ uri: response.data.profile_image_url }} style={{ width: 40, height: 40, borderRadius: 20, marginLeft: 10 }} />
              </TouchableOpacity>
            ),
          });
        })
        .catch(() => {
        });
    });
    this.pullRefresh();
    this.willFocusListener = this.props.navigation.addListener(
      'willFocus',
      () => {
        socket = io('http://kwikkerbackend.eu-central-1.elasticbeanstalk.com', { transports: ['websocket'] });
        socket.connect();
        AsyncStorage.getItem('@app:id').then((id) => {
          if (id !== this.state.currentUsername) {
            this.setState({ currentUsername: id, },);
            socket.on(this.state.currentUsername, (notification) => {
              PushNotification.localNotification({
                message: notification,
              });
              this.props.showNotification({
                title: notification,
                message: ' hi ',
                vibrate: true,
                onPress: () => this.props.navigation.navigate('Notifications')
              });
            });
          }
          axios.get('user/profile', {
            params: {
              username: id
            }
          })
            .then((response) => {
              AsyncStorage.setItem('@app:image', response.data.profile_image_url);
              this.props.navigation.setParams({
                headerLeft: (
                  <TouchableOpacity onPress={() => this.props.navigation.dispatch(DrawerActions.openDrawer())}>
                    <Image source={{ uri: response.data.profile_image_url }} style={{ width: 40, height: 40, borderRadius: 20, marginLeft: 10 }} />
                  </TouchableOpacity>
                ),
              });
            })
            .catch(() => {
            });
        });
        this.pullRefresh();
      }
    );
    //console.log('componentdidMount');
  }

/**
 * Pull to refresh functionality
 */
pullRefresh= () => {
  //console.log('pullRefresh');
  this.setState({
    refreshing: true,
  });
  //console.log(this.state.refreshing);
  this.updateKweeks();
}

/** Get more Kweeks when we get to the end of the scrollView.
 * Check we reached end of content
 * @param {int} layoutMeasurement - size of the layout .
 * @param  {int} contentOffset - position on screen
 * @param  {int} contentSize - size of all content
 */
moreKweeks=({ layoutMeasurement, contentOffset, contentSize }) => {
  if (layoutMeasurement.height + contentOffset.y >= contentSize.height - 1 && this.state.refreshing !== true) {
    this.setState({
      refreshing: true,
    });
    if (this.state.kweeks[this.state.kweeks.length - 1].rekweek_info !== null) {
      this.updateKweeks(this.state.kweeks[this.state.kweeks.length - 1].id, this.state.kweeks[this.state.kweeks.length - 1].rekweek_info.rekweeker_username);
    }
    this.updateKweeks(this.state.kweeks[this.state.kweeks.length - 1].id);
  }
}

/** Update Kweeks.
 * gets first 20 Kweeks With default parameter (id=null)
 * To retrieve more send the id of the last retrieved kweek.
 * @param {int} id - The id of Kweek .
 */
updateKweeks(id = null, username = null) {
  //console.log('updateKweeks');
  axios.get('kweeks/timelines/home', {
    params: {
      last_retrieved_kweek_id: id,
      last_retrieved_rekweeker_username: username
    }
  })
    .then((response) => {
      //console.log(response.status);
      if (id === null) {
        //console.log('response id null');
        this.setState({
          kweeks: response.data
        });
      } else {
        this.setState((prevState) => ({ kweeks: prevState.kweeks.concat(response.data)
        }));
      }
      this.setState({ refreshing: false });
    })
    .catch(() => {
    // handle error
      //console.log('get tweets error');
    })
    .then(() => {
    // always executed
    });
}

render() {
  //console.log('render');
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
        onScroll={({ nativeEvent }) => { this.moreKweeks(nativeEvent); }}
      >
        {this.state.kweeks.map((item) => (
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
      <TouchableOpacity onPress={() => this.props.navigation.navigate('CreateTweet')} style={{ position: 'absolute', right: 20, bottom: 20, width: 60, height: 60, borderRadius: 30, alignItems: 'flex-end' }}>
        <Image source={require('./../../Assets/Images/tweet1.png')} style={{ width: 60, height: 60, borderRadius: 30, alignItems: 'flex-end' }} />
      </TouchableOpacity>
    </View>
  );
}
}

export default withInAppNotification(Home);
