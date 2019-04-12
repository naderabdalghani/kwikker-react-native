import React, { Component } from 'react';
import { ScrollView, RefreshControl, TouchableOpacity } from 'react-native';
import { withInAppNotification } from 'react-native-in-app-notification';
import axios from 'axios';
import Notification from '../../Components/Notification/Notification';


class Notifications extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notifications: [],
      refreshing: false,
    };
  }

  componentDidMount() {
    this.pullRefresh();
  }


  /** Set type of notification when it's loaded. */
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

  /** pull to refresh functionality.
   * gets first 20 notifications
  */
 pullRefresh= () => {
   this.setState({
     refreshing: true,
   });
   this.updateNotifications();
 }


  /** Get more Notifications when we get to the end of the scrollView.
 * Check we reached end of content
 * @param {int} layoutMeasurement - size of the layout .
 * @param  {int} contentOffset - position on screen
 * @param  {int} contentSize - size of all content
 */
  moreNotifications=({ layoutMeasurement, contentOffset, contentSize }) => {
    if (layoutMeasurement.height + contentOffset.y >= contentSize.height - 1 && this.state.refreshing !== true) {
      this.setState({
        refreshing: true,
      });
      this.updateNotifications(this.state.notifications[this.state.notifications.length - 1].id);
    }
  }

  /** Update Notifications.
 * gets first 20 Notification With default parameter (id=null)
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
      <ScrollView
        refreshControl={(
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this.pullRefresh}
          />
)}
        style={{ flex: 1 }}
        onScroll={({ nativeEvent }) => { this.moreNotifications(nativeEvent); }}
      >
        {this.state.notifications.map((item, index) => (
          <TouchableOpacity
            onPress={() => {
              this.props.showNotification({
                title: `${item.screen_name} ${this.setType(item.type)}`,
                message: item.kweek_text,
                vibrate: true,
                icon: { uri: item.profile_pic_URL },

              });
            }}
          >
            <Notification
              key={item.id}
              profileUrl={item.profile_pic_URL}
              kweekText={item.kweek_text}
              type={item.type}
              screenName={item.screen_name}
            />
          </TouchableOpacity>
        ))
        }


      </ScrollView>
    );
  }
}

export default withInAppNotification(Notifications);
