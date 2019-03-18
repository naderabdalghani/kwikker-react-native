import React from 'react';
import { View } from 'react-native';
import styles from './Styles';

const Section = (props) => {
  return (
    <View style={styles.containerStyle}>
      {props.children}
    </View>
  );
};

export default Section;