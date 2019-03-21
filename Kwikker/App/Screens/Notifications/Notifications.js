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


  componentDidMount()
  {
    
    axios.get('/notifications')
    .then((response) => {
      this.setState({
        notifications: response.data
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
  render() {
    
    return (
        <ScrollView style={{ flex:1 }}> 
        {this.state.notifications.map((item,index) => (
          <Notification profileUrl = {item.profile_pic_URL} kweekText={item.kweek_text} type={item.type} screenName ={item.screen_name}  ></Notification>
          ))
        }
        

        </ScrollView>
    );
  }
}

