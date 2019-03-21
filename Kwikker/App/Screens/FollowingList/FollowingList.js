import React, { Component } from 'react';
import { Text, View } from 'react-native';
import Following from '../../Components/Following/Following'


export default class FollowingList extends Component
{

  constructor(props) {
    super(props);
  }

  render() {
    return (
        <View style={{ flex: 1}}>
          <Following></Following>
        </View>
    );
  }
}
