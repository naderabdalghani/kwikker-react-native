import React from 'react';
import { Text, TouchableNativeFeedback, View, StyleSheet } from 'react-native';
import styles from './Styles';

const CustomButton = ({ onPress, children, marginSize, customFontSize }) => {
  const { buttonStyle } = styles;
  const customStyle = StyleSheet.create({
    textStyle: {
      color: '#FFFF',
      fontSize: customFontSize,
      fontWeight: 'bold',
      paddingTop: 5,
      paddingBottom: 5,
      marginLeft: marginSize,
      marginRight: marginSize,
    },
  });

  return (
    <TouchableNativeFeedback onPress={onPress}>
      <View style={buttonStyle}>
        <Text style={customStyle.textStyle}>
          {children}
        </Text>
      </View>
    </TouchableNativeFeedback>
  );
};

export default CustomButton;