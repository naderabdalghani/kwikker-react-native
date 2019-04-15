import React from 'react';
import { Text, View, Image } from 'react-native';
import styles from './Styles';

/** @module Conversation **/

export default class Conversation extends React.Component {
  constructor(props) {
    super(props);
  }


  render() {
    return (

      <View style={styles.conversationContainer}>

        <View style={styles.headerContainer}>
          <View style={styles.profilePicture}>
            <Image style={styles.ProfileImage} source={{ uri: this.props.profileUrl }} />
          </View>
          <View style={styles.textHeader}>
            <Text style={{ fontWeight: 'bold' }}>{this.props.screenName}</Text>
            <Text> @{this.props.userName}</Text>
          </View>
        </View>
        <Text style={styles.textTime}> {this.props.messageTime}</Text>
        <Text style={styles.textContent} ellipsizeMode="tail" numberOfLines={1}>{this.props.messageText}</Text>
      </View>
    );
  }
}
