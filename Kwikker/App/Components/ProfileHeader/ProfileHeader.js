import React from 'react';
import { TouchableOpacity, Text, View, ScrollView, Image, TouchableNativeFeedback, Animated } from 'react-native';
import styles from './Styles';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      scrollY: new Animated.Value(0)
    };
  }

  render() {
    const ProfileImageHeight = this.state.scrollY.interpolate({
      inputRange: [0, 50],
      outputRange: [80, 40],
      extrapolate: 'clamp'
    });

    return (

      <View style={{ flex: 1 }}>
        <Animated.View style={styles.Cover} />

        <ScrollView style={{ flex: 1 }}>
          <View style={{ flex: 1, flexDirection: 'row' }}>
            <View style={styles.ProfileImageContainer}>
              <Image
                style={styles.ProfileImage}
                source={require('./../../Assets/Images/unknown.png')}
              />
            </View>
            <TouchableOpacity
              style={styles.EditProfile}
              onPress={this.props.EditProfile}
            >
              <Text style={{ color: '#657786', fontWeight: 'bold' }}>
            Edit Profile
              </Text>
            </TouchableOpacity>
          </View>

          <View style={{ marginLeft: 10, marginTop: 4 }}>
            <Text style={{ fontWeight: 'bold', fontSize: 20, color: '#000' }}>
              {this.props.username}
            </Text>
            <Text style={styles.Gray}>
              @{this.props.username}
            </Text>
            <Text style={styles.Gray}>
                ABOUT
            </Text>
            <View style={{ flex: 1, flexDirection: 'row' }}>
              <Text style={styles.Gray}>Joined </Text>
              <Text style={styles.Gray}>date</Text>
            </View>

            <View style={{ flex: 1, flexDirection: 'row' }}>
              <Text>0</Text>
              <TouchableOpacity onPress={this.props.Following}>
                <Text style={styles.Gray}> Following   </Text>
              </TouchableOpacity>
              <Text>0</Text>
              <TouchableOpacity onPress={this.props.Follower}>
                <Text style={styles.Gray}> Followers   </Text>
              </TouchableOpacity>
            </View>
          </View>


        </ScrollView>

      </View>
    );
  }
}
