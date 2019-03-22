import React, { Component } from 'react';

import { View, Text, Button, } from 'react-native';
import styles from './Styles';
export default class Media extends React.Component {
  render() {
    return (
      <View style={styles.Container}>
        <Text style={{ fontSize: 30 }}>
          Photos and videos that you Kweet will be collected here
        </Text>
      </View>
    );
  }
}