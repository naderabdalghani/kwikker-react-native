import React, { Component } from 'react';

import {View, StyleSheet, Text,Button, } from 'react-native';

export default class Media extends React.Component{

  render(){
    return <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
    <Text style={{fontSize:30}}>
    Photos and videos that you Kweet will be collected here
    </Text>
    </View>
  }
 
}