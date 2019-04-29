import React from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import styles from './Styles';

/** @module UserInSearch **/

export default class UserInSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      following: this.props.following,
      currentUsername: '',
    };
  }


  componentDidMount() {
    AsyncStorage.getItem('@app:id').then((id) => {
      this.setState({ currentUsername: id, },);
    });
  }


  /** follow user
 *  (Post request) follow user
 * @memberof UserInSearch
 */
  follow() {
    axios.post('interactions/follow', {
      username: this.props.userName
    })
      .then((response) => {
        this.setState({
          following: true,
        });
      })
      .catch((error) => {
      });
  }

  /** unfollow user
 *  (Post request) follow user
 * @memberof UserInSearch
 */
  unfollow() {
    axios.delete('interactions/follow', {
      params: {
        username: this.props.userName
      }
    }).then((response) => {
      this.setState({
        following: false,
      });
    })
      .catch((error) => {
      });
  }


  /** isMuted.
 * render "Muted" Image according to data from the backend
 * @memberof UserInSearch
 */
  isMuted() {
    if (this.props.muted) {
      return (<Image style={{ width: 25, height: 25, }} source={require('../../Assets/Images/mute.png')} />);
    }
    return (<Text />);
  }

  /** followText.
 * render right Text according to data from the backend
 * @memberof UserInSearch
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

  /** isFollowingOrBlock.
 * render right Component according to data from the backend
 * @memberof UserInSearch
 */
  isFollowingOrBlock() {
    if (this.props.blocked) {
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
            this.unfollow();
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
          this.follow();
        }}
      >
        <Text style={{ color: '#1DA1F2', fontWeight: 'bold' }}>
          Follow
        </Text>
      </TouchableOpacity>
    );
  }

  /** render follow or block Button
 *  if the user is not me
 * @memberof UserInSearch
 */

  renderButton() {
    if (this.props.userName !== this.state.currentUsername) {
      return (this.isFollowingOrBlock());
    }
    return (null);
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
          {this.isMuted()}
        </View>

        {this.renderButton()}

      </View>
    );
  }
}
