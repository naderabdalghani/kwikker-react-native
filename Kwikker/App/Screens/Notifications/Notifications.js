/* eslint-disable no-lonely-if */
import React, { Component } from 'react';
import { View, Text, ScrollView, RefreshControl, TouchableOpacity, Image } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import { DrawerActions } from 'react-navigation';
import NotificationsTaps from '../../Components/NotificationsTaps/NotificationsTaps';

/** @module Notifications **/

export default class Notifications extends Component {
  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state;
    return params;
  };

  constructor(props) {
    super(props);
    this.state = {
      unseenCount: 0,
      unseenCountMentions: 0,
      notifications: [],
      mentions: [],
      refreshing: false,
    };
  }

  componentDidMount() {
    AsyncStorage.getItem('@app:image').then((image) => {
      this.props.navigation.setParams({
        headerLeft: (
          <TouchableOpacity onPress={() => this.props.navigation.dispatch(DrawerActions.openDrawer())}>
            <Image source={{ uri: image }} style={{ width: 40, height: 40, borderRadius: 20, marginLeft: 10 }} />
          </TouchableOpacity>
        ),
      });
    });
    this.pullRefresh();
    this.willFocusListener = this.props.navigation.addListener(
      'willFocus',
      () => {
        AsyncStorage.getItem('@app:image').then((image) => {
          this.props.navigation.setParams({
            headerLeft: (
              <TouchableOpacity onPress={() => this.props.navigation.dispatch(DrawerActions.openDrawer())}>
                <Image source={{ uri: image }} style={{ width: 40, height: 40, borderRadius: 20, marginLeft: 10 }} />
              </TouchableOpacity>
            ),
          });
        });
        this.pullRefresh();
      }
    );
  }


  /** Set type of notification when it's loaded.
   * @memberof Notifications
   */
  setType(type) {
    switch (type) {
      case 'LIKE':

        return 'liked your kweek';


      case 'REKWEEK':

        return 'rekweek your kweek';


      case 'FOLLOW':

        return 'followed you';


      case 'REPLY':

        return 'replied on your kweek';


      case 'MESSAGE':

        return 'messaged you';


      default:

        return 'notification';
    }
  }
  /** showPopNotification
   * @memberof Notifications
   */


  /** pull to refresh functionality.
   * gets first 20 notifications
   * @memberof Notifications
  */
 pullRefresh= () => {
   this.setState({
     refreshing: true,
   });
   this.updateNotifications();
   this.updateMentions();
 }


  /** Get more Notifications when we get to the end of the scrollView.
 * Check we reached end of content
 * @memberof Notifications
 * @param {int} layoutMeasurement - size of the layout .
 * @param  {int} contentOffset - position on screen
 * @param  {int} contentSize - size of all content
 */
  moreNotifications=({ layoutMeasurement, contentOffset, contentSize }) => {
    if (layoutMeasurement.height + contentOffset.y >= contentSize.height - 1 && this.state.refreshing !== true && this.state.notifications.length) {
      this.setState({
        refreshing: true,
      });
      this.updateNotifications(this.state.notifications[this.state.notifications.length - 1].id);
    }
  }


  /** Get more Mentions when we get to the end of the scrollView.
 * Check we reached end of content
 * @memberof Notifications
 * @param {int} layoutMeasurement - size of the layout .
 * @param  {int} contentOffset - position on screen
 * @param  {int} contentSize - size of all content
 */
moreMentions=({ layoutMeasurement, contentOffset, contentSize }) => {
  if (layoutMeasurement.height + contentOffset.y >= contentSize.height - 1 && this.state.refreshing !== true && this.state.mentions.length) {
    this.setState({
      refreshing: true,
    });
    this.updateMentions(this.state.mentions[this.state.mentions.length - 1].id);
  }
}

/** Update Notifications.
 * gets first 20 Notification With default parameter (id=null)
 * To retrieve more send the id of the last retrieved notification.
 * @memberof Notifications
 * @param {int} id - The id of Notification .
 */
updateNotifications(id = null) {
  axios.get('notifications', {
    params: {
      last_notification_retrieved_id: id
    }
  })
    .then((response) => {
      if (id === null) {
        this.setState({
          unseenCount: response.data.unseen_count,
          notifications: response.data.Notifications
        });
      } else {
        this.setState((prevState) => ({
          unseenCount: response.data.unseen_count,
          notifications: prevState.notifications.concat(response.data.Notifications)
        }));
      }
      this.setState({ refreshing: false });
    })
    .catch((error) => {
      // handle error
      // console.log(error);
    })
    .then(() => {
      // always executed
    });
}


/** Update Mentions.
* gets first 20 Mention With default parameter (id=null)
* To retrieve more send the id of the last retrieved Mention.
* @memberof Notifications
* @param {int} id - The id of Mention .
*/
updateMentions(id = null) {
  axios.get('kweeks/timelines/mentions', {
    params: {
      last_retrieved_kweek_id: id
    }
  })
    .then((response) => {
      if (id === null) {
        this.setState({
          unseenCountMentions: response.data.unseen_count,
          mentions: response.data.replies_and_mentions
        });
      } else {
        this.setState((prevState) => ({
          unseenCountMentions: response.data.unseen_count,
          mentions: prevState.mentions.concat(response.data.replies_and_mentions)
        }));
      }
      this.setState({ refreshing: false });
    })
    .catch((error) => {
    // handle error
    // console.log(error);
    })
    .then(() => {
    // always executed
    });
}


render() {
  return (
    <NotificationsTaps screenProps={{ rootNav: this.props.navigation,
      mentions: this.state.mentions,
      unseenCountMentions: this.state.unseenCountMentions,
      refreshing: this.state.refreshing,
      pullRefresh: this.pullRefresh,
      notifications: this.state.notifications,
      unseenCount: this.state.unseenCount,
      moreNotifications: (data) => this.moreNotifications(data),
      moreMentions: (data) => this.moreMentions(data),
      setType: (data) => this.setType(data) }}
    />


  );
}
}
