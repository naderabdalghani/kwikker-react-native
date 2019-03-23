import React, { Component } from 'react';
import { ScrollView, RefreshControl } from 'react-native';
import axios from 'axios';
import Notification from '../../Components/Notification/Notification';

export default class Notifications extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notifications: [],
      refreshing: false,
    };
  }

  componentDidMount() {
    this.setState({
      notifications: []
    });
    this.updateNotifications();
  }

  pullRefresh= () => {
    this.setState({
      refreshing: true,
      notifications: []
    });
    this.updateNotifications();
    this.setState({
      refreshing: false
    });
  }

  /** Get more Notifications when we get to the end of the scrollView.
 * Check we reached end of content
 * @param {int} layoutMeasurement - size of the layout .
 * @param  {int} contentOffset - position on screen
 * @param  {int} contentSize - size of all content
 */
  MoreNotifications=({ layoutMeasurement, contentOffset, contentSize }) => {
    if (layoutMeasurement.height + contentOffset.y >= contentSize.height && this.state.notifications.length !== 0) {
      this.updateNotifications(this.state.notifications[this.state.notifications.length - 1].id);
    }
  }

  /** Update Notifications.
 * gets first 20 Notification with defult With default parameter (id=null)
 * To retrieve more send the id of the last retrieved notification.
 * @param {int} id - The id of Notification .
 */
  updateNotifications(id = null) {
    axios.get('notifications', {
      params: {
        last_notification_retrieved_id: id
      }
    })
      .then((response) => {
        this.setState((prevState) => ({ notifications: prevState.notifications.concat(response.data)
        }));
      })
      .catch((error) => {
      // handle error
      // console.log(error);
      })
      .then(() => {
      // always executed
      });
  }

  /** pull to refresh functionality.
   * gets first 20 notifications
  */


  render() {
    return (
      <ScrollView
        refreshControl={(
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this.pullRefresh}
          />
)}
        style={{ flex: 1 }}
        onScroll={({ nativeEvent }) => { this.MoreNotifications(nativeEvent); }}
      >
        {this.state.notifications.map((item, index) => (
          <Notification
            profileUrl={item.profile_pic_URL}
            kweekText={item.kweek_text}
            type={item.type}
            screenName={item.screen_name}
          />
        ))
        }


      </ScrollView>
    );
  }
}
