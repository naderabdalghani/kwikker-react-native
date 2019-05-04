import React from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import styles from './Styles';

/** @module Notification **/

export default class Notification extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      type: ' '
    };
  }


  componentDidMount() {
    this.setType();
  }

  /** Set type of notification when it's loaded.
   * @memberof Notification
   */
  setType() {
    switch (this.props.type) {
      case 'LIKE':
        this.setState({
          type: 'liked your kweek'
        });
        break;

      case 'REKWEEK':
        this.setState({
          type: 'rekweek your kweek'
        });
        break;

      case 'FOLLOW':
        this.setState({
          type: 'followed you'
        });
        break;

      case 'REPLY':
        this.setState({
          type: 'replied on your kweek'
        });
        break;

      case 'MESSAGE':
        this.setState({
          type: 'messaged you'
        });
        break;

      default:
        this.setState({
          type: 'notification'
        });
    }
  }


  render() {
    return (

      <View style={styles.notificationContainer}>
        <TouchableOpacity
          onPress={() => {
            this.props.rootNav.push('Profile', {
              username: this.props.userName,
            });
          }}
        >
          <View style={styles.profilePicture}>
            <Image style={styles.ProfileImage} source={{ uri: this.props.profileUrl }} />
          </View>
        </TouchableOpacity>
        <View style={styles.textContainer}>
          <View style={styles.textHeader}>
            <Text numberOfLines={1} style={{ fontWeight: 'bold' }}><Text style={{ color: 'white', fontSize: 0 }}>a</Text>{this.props.screenName}
              <Text style={{ fontWeight: 'normal' }}> {this.state.type}</Text>
            </Text>


          </View>
          <Text numberOfLines={1} style={styles.textContent}><Text style={{ color: 'white', fontSize: 0 }}>a</Text>{this.props.kweekText}</Text>
        </View>
      </View>
    );
  }
}
