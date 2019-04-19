import React, { Component } from 'react';
import { Thumbnail, Container, Header, Content } from 'native-base';
import { Text, View, TouchableOpacity, Image, Button, StyleSheet, TextInput } from 'react-native';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from 'axios';

export default class Kweek extends Component {
  constructor(props) {
    super(props);
    this.state = { key: this.props.key, liked: this.props.liked, rekeeked: this.props.rekweeked, likesCounter: this.props.numberOfLikes, rekweeksCounter: this.props.numberOfRekweeks };
  }

  /**
   * Calculate kweek date and time
   */
  dateAndTime() {
    const now = new Date();
    const months = [' Jan', ' Feb', ' Mar', ' Apr', ' May', ' Jun', ' Jul', ' Aug', ' Sep', ' Oct', ' Nov', ' Dec'];
    const dateTime = new Date(this.props.date);
    const day = dateTime.getDate();
    const year = dateTime.getFullYear();
    const month = dateTime.getMonth();
    const hour = dateTime.getHours();
    const minutes = dateTime.getMinutes();
    if (now.getFullYear() === year && now.getMonth() === month && now.getDate() === day && now.getHours() === hour) { return ((now.getMinutes() - minutes).toString().concat('m')); }
    if (now.getFullYear() === year && now.getMonth() === month && now.getDate() === day) { return ((now.getHours() - hour).toString().concat('h')); }
    if (now.getFullYear() === year) { return ((day).toString().concat(months[month])); }
    return ((months[month]).concat(' ').concat(year.toString()));
  }

  /**
   * Determine if it is a kweek shared by a followed user or it is rekweeked by him
   */
  kweekHeader() {
    if (this.props.rekweekerUserName === null) {
      return (null);
    }
    if (this.props.rekweekerUserName !== null) {
      return (
        <TouchableOpacity style={{ marginTop: '2%', marginBottom: '1%' }}>
          <View style={{ flexDirection: 'row' }}>
            <EvilIcons name="retweet" size={11} color="#657786" style={{ marginLeft: '15%', marginTop: '1%' }} />
            <Text style={{ color: '#657786', marginLeft: '4.5%' }}> rekweeked</Text>
          </View>
        </TouchableOpacity>
      );
    }
    /* if (this.props.likerUserName != null) {
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

  /**
  * Determine whether the kweek is liked by the user or not
  */
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

  /**
   * Determine whether the kweek is rekweeked by the user or not
   */
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

  /**
   * Handle like button press by changing the button color and changing the counter
   */
  likePressed() {
    console.log('like pressed');
    if (this.state.liked) {
      this.setState({ liked: false });
      this.setState((prevState) => ({ likesCounter: prevState.likesCounter - 1 }));
      axios.delete('kweeks/like', {
        params: {
          id: this.state.key
        }
      })
        .then((response) => {

        })

        .catch((error) => {
        // handle error
        // console.log(error);
        })
        .then(() => {
        // always executed
        });
    } else {
      this.setState({ liked: true });
      this.setState((prevState) => ({ likesCounter: prevState.likesCounter + 1 }));
      axios.post('kweeks/like', {
        params: {
          id: this.state.key
        }
      })
        .then((response) => {

        })

        .catch((error) => {
        // handle error
        // console.log(error);
        })
        .then(() => {
        // always executed
        });
    }
  }

  /**
   * Handle rekweek button press by changing button color and changing counter
   */
  rekweekPressed() {
    console.log('rekweek pressed');
    if (this.state.rekeeked) {
      this.setState({ rekeeked: false });
      this.setState((prevState) => ({ rekweeksCounter: prevState.rekweeksCounter - 1 }));
      axios.delete('kweeks/rekweek', {
        params: {
          id: this.state.key
        }
      })
        .then((response) => {

        })

        .catch((error) => {
        // handle error
        // console.log(error);
        })
        .then(() => {
        // always executed
        });
    } else {
      this.setState({ rekeeked: true });
      this.setState((prevState) => ({ rekweeksCounter: prevState.rekweeksCounter + 1 }));
      axios.post('kweeks/rekweek', {
        params: {
          id: this.state.key
        }
      })
        .then((response) => {

        })

        .catch((error) => {
        // handle error
        // console.log(error);
        })
        .then(() => {
        // always executed
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
                  <Text style={{ fontSize: 15, color: '#657786', marginLeft: '2%' }}>{ this.dateAndTime() }</Text>
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