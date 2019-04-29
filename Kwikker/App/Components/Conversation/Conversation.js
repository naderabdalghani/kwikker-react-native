import React from 'react';
import { Text, View, Image } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import styles from './Styles';

/** @module Conversation **/

export default class Conversation extends React.Component {
  constructor(props) {
    super(props);
  }

  /** render who Texted last Text
 *  if the user is me than render 'You:' before text
 *  else render nothing
 * @memberof Conversation
 */

  renderYou() {
    if (this.props.fromUsername === this.props.currentUsername) {
      return (<Text>You: </Text>);
    }
    return (null);
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
        <Text style={styles.textContent} numberOfLines={1}>{this.renderYou()}{this.props.messageText}</Text>
      </View>
    );
  }
}
