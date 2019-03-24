import React, { Component } from 'react';
import { Text, View } from 'react-native';
import styles from './Styles'
export default class Settings extends Component
{

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <View>
         
          <View style={styles.developersContainer}>
            <Text style={styles.developers}>
              Developers
            </Text>
          </View>
          <Text style={styles.members}>
            Nader
          </Text>
          <Text style={styles.members}>
            Shady Fahmy
          </Text>
          <Text style={styles.members}>
            Khaled Amgad
          </Text>
          <Text style={styles.members}>
            Sara Yasser
          </Text>
        </View>
      </View>
    );
  }
}

