import React, { Component } from 'react';
import { Text, View } from 'react-native';
import Followers from '../../Components/Fillowers/Followers'


export default class FillowersList extends Component
{

  constructor(props) {
    super(props);
  }

  render() {
    return (
        <View style={{ flex: 1}}>
          <Followers></Followers>
        </View>
    );
  }
}
