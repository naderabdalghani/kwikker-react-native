import React, { Component } from 'react';
import { Text, View, ScrollView, TouchableNativeFeedback, Image } from 'react-native';
import Followers from '../../Components/Followers/Followers';
import styles from './Styles';


export default class FillowersList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={{ flex: 1 }}>

        <View style={styles.header}>
          <View style={styles.backButtonContainer}>
            <TouchableNativeFeedback onPress={() => this.props.navigation.goBack(null)}>
              <Image
                style={styles.backButton}
                source={require('./../../Assets/Images/back_button.png')}
              />
            </TouchableNativeFeedback>
          </View>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Followers</Text>
          </View>
          <View />
          <View style={styles.dummyElement} />
        </View>


        <ScrollView>
          <Followers />
          <Followers />
          <Followers />
          <Followers />
          <Followers />
          <Followers />
          <Followers />
          <Followers />
          <Followers />
        </ScrollView>
      </View>
    );
  }
}
