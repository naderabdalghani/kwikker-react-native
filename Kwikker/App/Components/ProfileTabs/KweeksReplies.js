import React, { Component } from 'react';

import { View, Text, Button, } from 'react-native';
import styles from './Styles';

export default class KweeksReplies extends React.Component {
  render() {
    return (
      <View style={styles.Container}>
        <Text style={{ fontSize: 30 }}>
    Your Kweeks will show up here
        </Text>
      </View>
    );
  }
}