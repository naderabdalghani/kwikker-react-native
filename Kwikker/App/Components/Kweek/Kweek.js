import React, { Component } from 'react';
import { Thumbnail, Container, Header, Content } from 'native-base';
import { Text, View, TouchableOpacity, Image, Button, StyleSheet, TextInput } from 'react-native';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from 'axios';

export default class Kweek extends Component {
  constructor(props) {
    super(props);
    this.state = { liked: this.props.liked, rekeeked: this.props.rekweeked, likesCounter: this.props.numberOfLikes, rekweeksCounter: this.props.numberOfRekweeks };
  }

  kweekHeader() {
    if (this.props.rekweekerUserName === null) {
      return (null);
    }
    if (this.props.rekweekerUserName !== null) {
      return (
        <TouchableOpacity style={{ marginTop: '2%', marginBottom: '1%' }}>
          <View style={{ flexDirection: 'row' }}>
            <EvilIcons name="retweet" size={11} color="#657786" style={{ marginLeft: '15%', marginTop: '1%' }} />
            <Text style={{ color: '#657786', marginLeft: '4.5%' }}>{this.props.rekweekerUserName} rekweeked</Text>
          </View>
        </TouchableOpacity>
      );
    }
    /*if (this.props.likerUserName != null) {
      return (
        <TouchableOpacity style={{ marginTop: '2%', marginBottom: '1%' }}>
          <View style={{ flexDirection: 'row' }}>
            <Ionicons name="ios-heart" size={11} color="#657786" style={{ marginLeft: '15%', marginTop: '1%' }} />
            <Text style={{ color: '#657786', marginLeft: '4.5%' }}>{this.props.likerUserName} liked</Text>
          </View>
        </TouchableOpacity>
      );
    }
    */
  }

  likeStatus() {
    if (this.state.liked) {
      return (
        <TouchableOpacity onPress={this.likePressed.bind(this)} style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
          <Ionicons name="ios-heart" size={18} color="#FF0000" />
          <Text style={{ marginLeft: '3%' }}>{this.state.likesCounter === 0 ? null : this.state.likesCounter }</Text>
        </TouchableOpacity>
      );
    }
    return (
      <TouchableOpacity onPress={this.likePressed.bind(this)} style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
        <Ionicons name="ios-heart-empty" size={18} color="#657786" />
        <Text style={{ marginLeft: '3%' }}>{this.state.likesCounter === 0 ? null : this.state.likesCounter }</Text>
      </TouchableOpacity>
    );
  }

  rekweekStatus() {
    if (this.state.rekeeked) {
      return (
        <TouchableOpacity onPress={this.rekweekPressed.bind(this)} style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
          <EvilIcons name="retweet" size={28} color="#009900" />
          <Text>{this.state.rekweeksCounter === 0 ? null : this.state.rekweeksCounter }</Text>
        </TouchableOpacity>
      );
    }
    return (
      <TouchableOpacity onPress={this.rekweekPressed.bind(this)} style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
        <EvilIcons name="retweet" size={28} color="#657786" />
        <Text>{this.state.rekweeksCounter === 0 ? null : this.state.rekweeksCounter }</Text>
      </TouchableOpacity>
    );
  }

  likePressed() {
    console.log('like pressed');
    if (this.state.liked) {
      this.setState({ liked: false });
      this.setState((prevState) => ({ likesCounter: prevState.likesCounter - 1 }));
      axios.delete('kweeks/like', {
        params: {
          id: this.props.key
        }
      });
    } else {
      this.setState({ liked: true });
      this.setState((prevState) => ({ likesCounter: prevState.likesCounter + 1 }));
      axios.post('kweeks/like', {
        params: {
          id: this.props.key
        }
      });
    }
  }

  rekweekPressed() {
    console.log('rekweek pressed');
    if (this.state.rekeeked) {
      this.setState({ rekeeked: false });
      this.setState((prevState) => ({ rekweeksCounter: prevState.rekweeksCounter - 1 }));
      axios.delete('kweeks/rekweek', {
        params: {
          id: this.props.key
        }
      });
    } else {
      this.setState({ rekeeked: true });
      this.setState((prevState) => ({ rekweeksCounter: prevState.rekweeksCounter + 1 }));
      axios.post('kweeks/rekweek', {
        params: {
          id: this.props.key
        }
      });
    }
  }

  render() {
    console.log('inside home');
    return (
      <View style={{ borderBottomWidth: 0.5, borderBottomColor: '#AAB8C2' }}>
        {this.kweekHeader()}
        <TouchableOpacity style={{ marginLeft: '3%' }}>
          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity style={{ flex: 1 }}>
              <Thumbnail source={{ url: this.props.profileImageUrl }} />
            </TouchableOpacity>
            <View style={{ flex: 4, flexDirection: 'column' }}>
              <View style={{ flexDirection: 'row' }}>
                <View style={{ flex: 8, flexDirection: 'row' }}>
                  <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#000000' }}>{this.props.screenName}</Text>
                  <Text style={{ fontSize: 15, color: '#657786', marginLeft: '2%' }}>@{this.props.userName}</Text>
                  <Text style={{ fontSize: 15, color: '#657786', marginLeft: '2%' }}> . 4h</Text>
                </View>
                <TouchableOpacity style={{ flex: 1 }}>
                  <Ionicons name="ios-arrow-down" size={15} color="#657786" />
                </TouchableOpacity>
              </View>
              <Text style={{ fontSize: 15, color: '#000000' }}>{this.props.kweekText}</Text>
            </View>
          </View>
        </TouchableOpacity>
        <View style={{ flexDirection: 'row', marginTop: '3%', marginBottom: '3%' }}>
          <TouchableOpacity style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
            <EvilIcons name="comment" size={26} color="#657786" />
            <Text>{this.props.numberOfReplies === 0 ? null : this.props.numberOfReplies}</Text>
          </TouchableOpacity>
          {this.rekweekStatus()}
          {this.likeStatus()}
        </View>
      </View>
    );
  }
}