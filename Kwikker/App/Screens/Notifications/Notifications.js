import React, { Component } from 'react';
import { Text, View,ScrollView } from 'react-native';
import axios from 'axios';
import Notification from '../../Components/Notification/Notification'

export default class Notifications extends Component
{
  constructor(props) {
    super(props);
    this.state=
    {
      notifications:[]
    }
  }
  
  /** Update Notifications.
 * gets first 20 Notification with defult With default parameter (id=null)
 * To retrieve more send the id of the last retrieved notification.
 * @param {int} id - The id of Notification .
 */

  MoreNotifications=({layoutMeasurement,contentOffset,contentSize })=>
  {
      if(layoutMeasurement.height + contentOffset.y >= contentSize.height -1)
      {
        this.updateNotifications(this.state.notifications.length-1)
      }
  }

/** Update Notifications.
 * gets first 20 Notification with defult With default parameter (id=null)
 * To retrieve more send the id of the last retrieved notification.
 * @param {int} id - The id of Notification .
 */
  updateNotifications(id=null)
  {
    axios.get('/notifications', {
      params: {
        id: id
      }
    })
    .then((response) => {
      this.setState({
        notifications: this.state.notifications.concat(response.data) 
        })
      console.log(response.data);
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
    .then(function () {
      // always executed
    });

  }



  


  componentDidMount()
  {
    this.updateNotifications();
  }
  render() {
    
    return (
        <ScrollView style={{ flex:1 }} onScroll={ ({nativeEvent})=>{this.MoreNotifications(nativeEvent)}}> 
        {this.state.notifications.map((item,index) => (
          <Notification profileUrl = {item.profile_pic_URL} kweekText={item.kweek_text} type={item.type} screenName ={item.screen_name}  ></Notification>
          ))
        }
        

        </ScrollView>
    );
  }
}

