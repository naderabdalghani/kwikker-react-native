import React from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import axios from 'axios';
import styles from './Styles';

/** @module MutedAccount **/

export default class MutedAccount extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }


  /**
 * unmute user.
 * @memberof MutedAccount
 */
  unMute() {
    axios.delete('interactions/mutes', {
      params: {
        username: this.props.userName
      }
    }).then((response) => {
      this.props.pullRefresh();
    })
      .catch((error) => {
      });
  }


  render() {
    return (

      <View style={styles.container}>
        <View style={styles.profilePicture}>
          <Image style={styles.ProfileImage} source={{ uri: this.props.profileUrl }} />
        </View>
        <View style={styles.textContainer}>
          <Text style={{ fontWeight: 'bold' }}>{this.props.screenName}</Text>
          <Text style={{ color: '#AAB8C2' }}>{this.props.userName}</Text>

        </View>
        <TouchableOpacity
          style={styles.following}
          onPress={() => {
            this.unMute();
          }}
        >
          <Text style={{ color: 'white', fontWeight: 'bold' }}>
            Unmute
          </Text>

        </TouchableOpacity>
      </View>
    );
  }
}
