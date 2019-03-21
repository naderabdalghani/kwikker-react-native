import React, { Component } from 'react';
import { Text, View,ScrollView } from 'react-native';
import Notification from '../../Components/Notification/Notification'

export default class Notifications extends Component
{
  constructor(props) {
    super(props);
  }
  render() {
    return (
        <ScrollView style={{ flex:1 }}>         
          <Notification></Notification>
          <Notification></Notification>
          <Notification></Notification>
          <Notification></Notification>
        </ScrollView>
    );
  }
}

