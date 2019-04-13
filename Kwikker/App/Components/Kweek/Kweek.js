import React, { Component } from 'react';
import { Thumbnail } from 'native-base';
import { Text, View, TouchableOpacity, Image, Button, StyleSheet, TextInput } from 'react-native';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
//import console = require('console');

export default class Kweek extends Component {
  constructor(props) {
    super(props);
  }

  state = { liked: true, rekeeked: true, likesCounter: 17, rekweeksCounter: 18 };

  likeStatus() {
    if (this.state.liked) {
      return (
        <TouchableOpacity onPress={this.likePressed.bind(this)} style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
          <Ionicons name="ios-heart" size={18} color="#FF0000" />
          <Text style={{ marginLeft: '3%' }}>{this.state.likesCounter}</Text>
        </TouchableOpacity>
      );
    }
    return (
      <TouchableOpacity onPress={this.likePressed.bind(this)} style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
        <Ionicons name="ios-heart-empty" size={18} color="#657786" />
        <Text style={{ marginLeft: '3%' }}>{this.state.likesCounter}</Text>
      </TouchableOpacity>
    );
  }

  rekweekStatus() {
    if (this.state.rekeeked) {
      return (
        <TouchableOpacity onPress={this.rekweekPressed.bind(this)} style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
          <EvilIcons name="retweet" size={28} color="#009900" />
          <Text>{this.state.rekweeksCounter}</Text>
        </TouchableOpacity>
      );
    }
    return (
      <TouchableOpacity onPress={this.rekweekPressed.bind(this)} style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
        <EvilIcons name="retweet" size={28} color="#657786" />
        <Text>{this.state.rekweeksCounter}</Text>
      </TouchableOpacity>
    );
  }

  likePressed() {
    console.log('like pressed');
    if (this.state.liked) {
      this.setState({ liked: false });
      this.setState((prevState) => ({ likesCounter: prevState.likesCounter - 1 }));
    } else {
      this.setState({ liked: true });
      this.setState((prevState) => ({ likesCounter: prevState.likesCounter + 1 }));
    }
  }

  rekweekPressed() {
    console.log('rekweek pressed');
    if (this.state.rekeeked) {
      this.setState({ rekeeked: false });
      this.setState((prevState) => ({ rekweeksCounter: prevState.rekweeksCounter - 1 }));
    } else {
      this.setState({ rekeeked: true });
      this.setState((prevState) => ({ rekweeksCounter: prevState.rekweeksCounter + 1 }));
    }
  }

  render() {
    console.log('inside home');
    return (
      <View style={{ borderBottomWidth: 0.5, borderBottomColor: '#AAB8C2' }}>
        <TouchableOpacity style={{ marginTop: '2%', marginBottom: '1%' }}>
          <View style={{ flexDirection: 'row' }}>
            <Ionicons name="ios-heart" size={11} color="#657786" style={{ marginLeft: '15%', marginTop: '1%' }} />
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