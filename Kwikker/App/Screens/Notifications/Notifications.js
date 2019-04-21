import React, { Component } from 'react';
import { View, Text, ScrollView, RefreshControl, TouchableOpacity, Image } from 'react-native';
import axios from 'axios';
import { withInAppNotification } from 'react-native-in-app-notification/src/index';
import NotificationsTaps from '../../Components/NotificationsTaps/NotificationsTaps';

/** @module Notifications **/

export class Notifications extends Component {
  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state;
    return params;
  };

  constructor(props) {
    super(props);
    this.state = {
      notifications: [],
      refreshing: false,
    };
  }

  componentDidMount() {
    this.props.navigation.setParams({
      headerLeft: (
        <TouchableOpacity>
          <Image source={require('./../../Assets/Images/pp.png')} style={{ width: 40, height: 40, borderRadius: 20, marginLeft: 10 }} />
        </TouchableOpacity>
      ),
    });
    this.pullRefresh();
    this.willFocusListener = this.props.navigation.addListener(
      'willFocus',
      () => {
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

  showPopNotification= (screenName, kweekText, type) => {
    this.props.showNotification({
      title: `${screenName} ${this.setType(type)}`,
      message: kweekText,
      vibrate: true,


    });
  };


  /** pull to refresh functionality.
   * gets first 20 notifications
   * @memberof Notifications
  */
 pullRefresh= () => {
   this.setState({
     refreshing: true,
   });
   this.updateNotifications();
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
            notifications: response.data
          });
        } else {
          this.setState((prevState) => ({ notifications: prevState.notifications.concat(response.data)
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
        refreshing: this.state.refreshing,
        pullRefresh: this.pullRefresh,
        notifications: this.state.notifications,
        moreNotifications: (data) => this.moreNotifications(data),
        showPopNotification: (data1, data2, data3) => this.showPopNotification(data1, data2, data3),
        setType: (data) => this.setType(data) }}
      />


    );
  }
}

export default withInAppNotification(Notifications);
