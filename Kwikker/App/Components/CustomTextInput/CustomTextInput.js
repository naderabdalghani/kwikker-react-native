import React from 'react';
import { TextInput, View, Text } from 'react-native';
import styles from './Styles';

const BLUE = '#1DA1F2';
const LIGHT_GRAY = '#AAB8C2';

/** @module CustomTextInput **/

class CustomTextInput extends React.Component {
  constructor(props) {
    super(props);
  }

  state = { isFocused: false };

  /**
   * Sets text Input underline color to blue should the text input field is selected
   * @memberof CustomTextInput
   */
  handleFocus = () => {
    this.setState({ isFocused: true });
  };

  /**
   * Sets text Input underline color to gray should the text input field is selected
   * @memberof CustomTextInput
   */
  handleBlur = () => {
    this.setState({ isFocused: false });
  };

  render() {
    const { isFocused } = this.state;
    const { inputStyle, labelStyle, containerStyle } = styles;
    const { onFocus, onBlur, label, secureTextEntry, placeholder, value, onChangeText, autoFocus, autoCapitalize, marginSize, marginTopSize = 10 } = this.props;
    return (
      <View style={{ ...containerStyle, marginLeft: marginSize, marginRight: marginSize, marginTop: marginTopSize }}>
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
          autoCapitalize={autoCapitalize}
          selectionColor={BLUE}
        />
      </View>
    );
  }
}

export default CustomTextInput;