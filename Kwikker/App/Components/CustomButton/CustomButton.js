import React from 'react';
import { Text, TouchableNativeFeedback, View, StyleSheet } from 'react-native';
import styles from './Styles';

const BLUE = '#38A1F3';
const LIGHT_BLUE = '#89CCFD';

const CustomButton = ({ onPress, children, marginSize, customFontSize, disabled }) => {
  const { buttonStyle, textStyle } = styles;

  return (
    <TouchableNativeFeedback onPress={onPress} disabled={disabled}>
      <View style={{ ...buttonStyle, backgroundColor: disabled ? LIGHT_BLUE : BLUE, borderColor: disabled ? LIGHT_BLUE : BLUE }}>
        <Text style={{ ...textStyle, marginLeft: marginSize, marginRight: marginSize, fontSize: customFontSize }}>
          {children}
        </Text>
      </View>
    </TouchableNativeFeedback>
  );
};

export default CustomButton;