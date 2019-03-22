import React from 'react';
import { TextInput, View, Text } from 'react-native';
import styles from './Styles';

const BLUE = '#1DA1F2';
const LIGHT_GRAY = '#AAB8C2';

class CustomTextInput extends React.Component {
  constructor(props) {
    super(props);
  }

  state = { isFocused: false };

  handleFocus = (event) => {
    this.setState({ isFocused: true });

    if (this.props.onFocus) {
      this.props.onFocus(event);
    }
  };

  handleBlur = (event) => {
    this.setState({ isFocused: false });

    if (this.props.onBlur) {
      this.props.onBlur(event);
    }
  };

  render() {
    const { isFocused } = this.state;
    const { inputStyle, labelStyle, containerStyle } = styles;
    const { onFocus, onBlur, label, secureTextEntry, placeholder, value, onChangeText, autoFocus } = this.props;
    return (
      <View style={containerStyle}>
        <Text style={labelStyle}>{label}</Text>
        <TextInput
          secureTextEntry={secureTextEntry}
          placeholder={placeholder}
          autoCorrect={false}
          style={inputStyle}
          value={value}
          onChangeText={onChangeText}
          underlineColorAndroid={
            isFocused ? BLUE : LIGHT_GRAY
          }
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          autoFocus={autoFocus}
          selectionColor={BLUE}
        />
      </View>
    );
  }
}

export default CustomTextInput;