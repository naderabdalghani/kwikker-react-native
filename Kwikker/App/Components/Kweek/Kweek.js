import React, { Component } from 'react';
import { Thumbnail } from 'native-base';
import { Text, View, TouchableOpacity, Image, Button, StyleSheet, TextInput } from 'react-native';
import EvilIcons from 'react-native-vector-icons/EvilIcons';

export default class Kweek extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={{ borderBottomWidth: 0.75, borderBottomColor: '#AAB8C2' }}>
        <TouchableOpacity style={{ marginLeft: '17%', marginTop: '2%', marginBottom: '2%' }}>
          <View>
            <Text>user liked</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={{ marginLeft: '3%' }}>
          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity style={{ flex: 1 }}>
              <Thumbnail source={require('./../../Assets/Images/pp.png')} />
            </TouchableOpacity>
            <View style={{ flex: 4, flexDirection: 'column' }}>
              <TouchableOpacity style={{ flexDirection: 'row' }}>
                <Text>UserName</Text>
                <Text>UserHandle</Text>
              </TouchableOpacity>
              <Text>this is the tweet stupid text</Text>
            </View>
          </View>
        </TouchableOpacity>
        <View style={{ flexDirection: 'row', marginTop: '3%', marginBottom: '3%' }}>
          <TouchableOpacity style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
            <EvilIcons name="comment" size={26} color="#657786" />
            <Text>12</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
            <EvilIcons name="retweet" size={28} color="#657786" />
            <Text>13</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
            <EvilIcons name="heart" size={28} color="#657786" />
            <Text>18</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}