import React from 'react';
import { Text, TouchableNativeFeedback, View, StyleSheet } from 'react-native';
import styles from './Styles';

const CustomButton = ({ onPress, children, marginSize, customFontSize, disabled }) => {
  const { buttonStyle } = styles;
  const customStyle = StyleSheet.create({
    textStyle: {
      color: '#FFFF',
      fontSize: customFontSize,
      fontWeight: 'bold',
      paddingTop: 3,
      paddingBottom: 3,
      marginLeft: marginSize,
      marginRight: marginSize,
      textAlign: 'center',
    },
  });

  return (
    <TouchableNativeFeedback onPress={onPress} disabled={disabled}>
      <View style={buttonStyle}>
        <Text style={customStyle.textStyle}>
          {children}
        </Text>
      </View>
    </TouchableNativeFeedback>
  );
};

export default CustomButton;