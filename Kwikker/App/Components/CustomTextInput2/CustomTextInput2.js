import React from 'react';
import { TextInput, View, Text } from 'react-native';
import styles from './Styles';

const BLUE = '#89CCFD';
const GRAY = '#AAB8C2';
let customBorderColor = GRAY;
let customBorderWidth = 1;

class CustomTextInput2 extends React.Component {
  constructor(props) {
    super(props);
  }

  state = { isFocused: false };

  /**
   * Sets isFocused to true should the text input field is selected
   */
  handleFocus = () => {
    this.setState({ isFocused: true });
  };

  /**
   * Sets isFocused to false should the text input field is unselected
   */
  handleBlur = () => {
    this.setState({ isFocused: false });
  };

  render() {
    const { isFocused } = this.state;
    if (isFocused) {
      customBorderColor = BLUE;
      customBorderWidth = 2;
    } else {
      customBorderColor = GRAY;
      customBorderWidth = 1;
    }
    const { inputStyle, labelStyle, containerStyle } = styles;
    const { onFocus, onBlur, label, secureTextEntry, placeholder, value, onChangeText, autoFocus, autoCapitalize, marginSize, marginTopSize = 10 } = this.props;
    return (
      <View style={{ ...containerStyle, marginLeft: marginSize, marginRight: marginSize, marginTop: marginTopSize, borderColor: customBorderColor, borderWidth: customBorderWidth }}>
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

export default CustomTextInput2;