import React from 'react';
import { Text, View, Image } from 'react-native';
import styles from './Styles';

export default class Followers extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (

      <View style={styles.container}>
        <View style={styles.profilePicture}>
          <Image style={styles.ProfileImage} source={{ uri: this.props.profileUrl }} />
        </View>
        <View style={styles.textContainer}>
          <Text style={{ color: '#AAB8C2' }}>Follows you</Text>
          <Text style={{ fontWeight: 'bold' }}>name</Text>
          <Text style={{ color: '#AAB8C2' }}>userName</Text>
          <Text>about</Text>
        </View>
        <View style={styles.follow}>
          <Text style={{ color: '#1DA1F2', fontWeight: 'bold' }}>
            Follow
          </Text>

        </View>
      </View>
    );
  }
}
