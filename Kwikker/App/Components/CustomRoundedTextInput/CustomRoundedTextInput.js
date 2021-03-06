import React from 'react';
import { TextInput, View, Text } from 'react-native';
import styles from './Styles';

const BLUE = '#89CCFD';
const GRAY = '#AAB8C2';
let customBorderColor = GRAY;

/** @module CustomRoundedTextInput **/

class CustomRoundedTextInput extends React.Component {
  constructor(props) {
    super(props);
  }

  state = { isFocused: false };

  /**
   * Sets text Input border color to blue should the text input field is selected
   * @memberof CustomRoundedTextInput
   */
  handleFocus = () => {
    this.setState({ isFocused: true });
  };

  /**
   * Sets text Input border color to gray should the text input field is selected
   * @memberof CustomRoundedTextInput
   */
  handleBlur = () => {
    this.setState({ isFocused: false });
  };

  render() {
    const { isFocused } = this.state;
    if (isFocused) {
      customBorderColor = BLUE;
    } else {
      customBorderColor = GRAY;
    }
    const { inputStyle, labelStyle, containerStyle } = styles;
    const { onFocus, onBlur, label, secureTextEntry, placeholder, value, onChangeText, autoFocus, autoCapitalize, marginSize, marginTopSize = 10 } = this.props;
    return (
      <View style={{ ...containerStyle, marginLeft: marginSize, marginRight: marginSize, marginTop: marginTopSize, borderColor: customBorderColor }}>
        <TextInput
          secureTextEntry={secureTextEntry}
          autoCorrect={false}
          style={{ ...inputStyle }}
          value={value}
          onChangeText={onChangeText}
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

export default CustomRoundedTextInput;