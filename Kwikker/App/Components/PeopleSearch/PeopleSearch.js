import React from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import axios from 'axios';
import styles from './Styles';

/** @module PeopleSearch **/

export default class PeopleSearch extends React.Component {
  constructor(props) {
    super(props);
  }

  /** followText.
 * render right Text according to data from the backend
 * @memberof PeopleSearch
 */
  followText() {
    if (this.props.blocked) {
      return (<Text />);
    }
    if (this.props.following && this.props.followsYou) {
      return (<Text style={{ color: '#AAB8C2', fontSize: 12 }}>You follow each other</Text>);
    }
    if (this.props.following) {
      return (<Text style={{ color: '#AAB8C2', fontSize: 12 }}>Following</Text>);
    }
    if (this.props.followsYou) {
      return (<Text style={{ color: '#AAB8C2', fontSize: 12 }}>Follows you</Text>);
    }
    return (<Text />);
  }


  render() {
    return (

      <View style={styles.container}>
        <View style={styles.profilePicture}>
          <Image style={styles.ProfileImage} source={{ uri: this.props.profileUrl }} />
        </View>
        <View style={styles.textContainer}>
          {this.followText()}
          <Text style={{ fontWeight: 'bold' }}>{this.props.screenName}</Text>
          <Text style={{ color: '#AAB8C2' }}>{this.props.userName}</Text>
        </View>


      </View>
    );
  }
}
