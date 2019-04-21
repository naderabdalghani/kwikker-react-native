import React from 'react';
import { Text, View, Image } from 'react-native';
import styles from './Styles';

/** @module Trend **/

export default class Trend extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (

      <View style={styles.TrendContainer}>
        <View style={styles.textContainer}>
          <View style={styles.textHeader}>
            <Text style={{ fontWeight: 'bold' }}>{this.props.text}</Text>
          </View>
          <Text style={styles.textContent}>{this.props.numberOfKweeks}</Text>
        </View>
      </View>
    );
  }
}
