import React, { Component } from 'react';

import {View, StyleSheet, Text,Button, } from 'react-native';

export default class Kweeks extends React.Component{

  render(){
    return <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
    <Text style={{fontSize:30}}>
    Your Kweets will show up here
    </Text>
    </View>
  }
}