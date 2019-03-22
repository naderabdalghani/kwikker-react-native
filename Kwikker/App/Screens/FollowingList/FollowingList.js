import React, { Component } from 'react';
import { Text, View,ScrollView } from 'react-native';
import Following from '../../Components/Following/Following'


export default class FollowingList extends Component
{

  constructor(props) {
    super(props);
  }

  render() {
    return (
        <ScrollView style={{ flex: 1}}>
          <Following></Following>
          <Following></Following>
          <Following></Following>
          <Following></Following>
          <Following></Following>
          <Following></Following>
          <Following></Following>
          <Following></Following>
          <Following></Following>
        </ScrollView>
    );
  }
}