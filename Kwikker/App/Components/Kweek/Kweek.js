import React, { Component } from 'react';
import { Thumbnail } from 'native-base';
import { Text, View, TouchableOpacity, Image, Button, StyleSheet, TextInput } from 'react-native';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';

export default class Kweek extends Component {
  constructor(props) {
    super(props);
  }

  likeStatus() {
    if (true) {
      return (
        <TouchableOpacity style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
          <AntDesign name="heart" size={16} color="#FF0000" />
          <Text style={{ marginLeft: '3%' }}>18</Text>
        </TouchableOpacity>
      );
    }
    return (
      <TouchableOpacity style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
        <EvilIcons name="heart" size={28} color="#657786" />
        <Text>18</Text>
      </TouchableOpacity>
    );
  }

  rekweekStatus() {
    if (true) {
      return (
        <TouchableOpacity style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
          <EvilIcons name="retweet" size={28} color="#009900" />
          <Text>13</Text>
        </TouchableOpacity>
      );
    }
    return (
      <TouchableOpacity style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
        <EvilIcons name="retweet" size={28} color="#657786" />
        <Text>13</Text>
      </TouchableOpacity>
    );
  }

  render() {
    return (
      <View style={{ borderBottomWidth: 0.5, borderBottomColor: '#AAB8C2' }}>
        <TouchableOpacity style={{ marginTop: '2%', marginBottom: '1%' }}>
          <View style={{ flexDirection: 'row' }}>
            <AntDesign name="heart" size={11} color="#657786" style={{ marginLeft: '15%', marginTop: '1%' }} />
            <Text style={{ color: '#657786', marginLeft: '4.5%' }}>user liked</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={{ marginLeft: '3%' }}>
          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity style={{ flex: 1 }}>
              <Thumbnail source={require('./../../Assets/Images/pp.png')} />
            </TouchableOpacity>
            <View style={{ flex: 4, flexDirection: 'column' }}>
              <TouchableOpacity style={{ flexDirection: 'row' }}>
                <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#000000' }}>UserName</Text>
                <Text style={{ fontSize: 15, color: '#657786', marginLeft: '2%' }}>@UserHandle</Text>
              </TouchableOpacity>
              <Text style={{ fontSize: 15, color: '#000000' }}>this is the tweet stupid text</Text>
            </View>
          </View>
        </TouchableOpacity>
        <View style={{ flexDirection: 'row', marginTop: '3%', marginBottom: '3%' }}>
          <TouchableOpacity style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
            <EvilIcons name="comment" size={26} color="#657786" />
            <Text>12</Text>
          </TouchableOpacity>
          {this.rekweekStatus()}
          {this.likeStatus()}
        </View>
      </View>
    );
  }
}