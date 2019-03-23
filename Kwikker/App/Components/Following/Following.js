import React from 'react';
import { Text, View, Image } from 'react-native';
import styles from './Styles';

export default class Notification extends React.Component {
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
          <Text style={{fontWeight:"bold"}} >name</Text>
          <Text style={{color:'#AAB8C2'}}>userName</Text>
          <Text >about</Text>
        </View> 
        <View style={styles.following}>
          <Text style={{ color: 'white', fontWeight: 'bold' }}>
            Following
          </Text>

        </View>
      </View>
    );
  }
}
