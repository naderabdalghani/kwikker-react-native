import React from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import axios from 'axios';
import styles from './Styles';

export default class PeopleSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.props;
  }

  /** followText.
 * render right Text according to data from the backend
 */
  followText() {
    if (this.state.blocked) {
      return (<Text />);
    }
    if (this.state.following && this.state.followsYou) {
      return (<Text style={{ color: '#AAB8C2', fontSize: 12 }}>You follow each other</Text>);
    }
    if (this.state.following) {
      return (<Text style={{ color: '#AAB8C2', fontSize: 12 }}>Following</Text>);
    }
    if (this.state.followsYou) {
      return (<Text style={{ color: '#AAB8C2', fontSize: 12 }}>Follows you</Text>);
    }
    return (<Text />);
  }


  render() {
    return (

      <View style={styles.container}>
        <View style={styles.profilePicture}>
          <Image style={styles.ProfileImage} source={{ uri: this.state.profileUrl }} />
        </View>
        <View style={styles.textContainer}>
          {this.followText()}
          <Text style={{ fontWeight: 'bold' }}>{this.state.screenName}</Text>
          <Text style={{ color: '#AAB8C2' }}>{this.state.userName}</Text>
        </View>


      </View>
    );
  }
}
