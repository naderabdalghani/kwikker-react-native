import React, { Component } from 'react';
import { Text, View ,ScrollView} from 'react-native';
import Followers from '../../Components/Fillowers/Followers'


export default class FillowersList extends Component
{

  constructor(props) {
    super(props);
  }

  render() {
    return (
        <ScrollView style={{ flex: 1}}>
          <Followers></Followers>
          <Followers></Followers>
          <Followers></Followers>
          <Followers></Followers>
          <Followers></Followers>
          <Followers></Followers>
          <Followers></Followers>
          <Followers></Followers>
          <Followers></Followers>
        </ScrollView>
    );
  }
}
