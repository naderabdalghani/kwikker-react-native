import React, { Component } from 'react';

import {View, StyleSheet, Text,Button, } from 'react-native';

export default class Likes extends React.Component{

  render(){
    return <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
    <Text style={{fontSize:30}}>
    No likes
    </Text>
    </View>
  }
 
}