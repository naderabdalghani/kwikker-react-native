import React from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import axios from 'axios';
import styles from './Styles';

export default class UserInSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.props;
  }


  /** follow user
 *  (Post request) follow user
 */
  follow() {
    axios.post('interactions/follow', {
      username: this.state.userName
    })
      .then((response) => {
      })
      .catch((error) => {
      });
  }

  /** unfollow user
 *  (Post request) follow user
 */
  unfollow() {
    axios.delete('interactions/follow', { data: { username: this.state.userName } });
  }


  /** isMuted.
 * render "Muted" Text according to data from the backend
 */
  isMuted() {
    if (this.state.muted) {
      return (<Image style={{ width: 25, height: 25, }} source={require('../../Assets/Images/mute.png')} />);
    }
    return (<Text />);
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

  /** isFollowingOrBlock.
 * render right Component according to data from the backend
 */
  isFollowingOrBlock() {
    if (this.state.blocked) {
      return (
        <TouchableOpacity style={styles.blocked}>
          <Text style={{ color: '#000', fontWeight: 'bold' }}>
              blocked
          </Text>

        </TouchableOpacity>

      );
    }
    if (this.state.following) {
      return (
        <TouchableOpacity
          style={styles.following} onPress={() => {
            this.setState({
              following: false,
            });
            setTimeout(() => { this.unfollow(); }, 500);
          }}
        >
          <Text style={{ color: 'white', fontWeight: 'bold' }}>
            Following
          </Text>

        </TouchableOpacity>

      );
    }
    return (
      <TouchableOpacity
        style={styles.follow} onPress={() => {
          this.setState({
            following: true,
          });
          setTimeout(() => { this.follow(); }, 500);
        }}
      >
        <Text style={{ color: '#1DA1F2', fontWeight: 'bold' }}>
          Follow
        </Text>
      </TouchableOpacity>
    );
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
          {this.isMuted()}
        </View>

        {this.isFollowingOrBlock()}

      </View>
    );
  }
}
