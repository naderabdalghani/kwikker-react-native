import React from 'react';
import { Text, View, Image } from 'react-native';
import styles from './Styles';

/** @module MutedAccount **/

export default class MutedAccount extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      following: this.props.following
    };
  }


  /** followText.
 * render right Text according to data from the backend
 * @memberof MutedAccount
 */
  followText() {
    if (this.props.blocked) {
      return (<Text />);
    }
    if (this.state.following && this.props.followsYou) {
      return (<Text style={{ color: '#AAB8C2', fontSize: 12 }}>You follow each other</Text>);
    }
    if (this.state.following) {
      return (<Text style={{ color: '#AAB8C2', fontSize: 12 }}>Following</Text>);
    }
    if (this.props.followsYou) {
      return (<Text style={{ color: '#AAB8C2', fontSize: 12 }}>Follows you</Text>);
    }
    return (<Text />);
  }

  render() {
    return (

      <View style={styles.accountContainer}>
        <View style={styles.profilePicture}>
          <Image style={styles.ProfileImage} source={{ uri: this.props.profileUrl }} />
        </View>
        <View style={styles.textContainer}>
          {this.followText()}
          <Text style={{ fontWeight: 'bold' }}>{this.props.screenName}</Text>
          <Text style={{ color: '#AAB8C2' }}>{this.props.userName}</Text>
          <Image style={{ width: 25, height: 25, }} source={require('../../Assets/Images/mute.png')} />
        </View>
      </View>
    );
  }
}
