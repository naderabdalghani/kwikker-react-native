import React from 'react';
import { Text, View, KeyboardAvoidingView } from 'react-native';
import CustomTextInput from '../../Components/CustomTextInput/CustomTextInput';
import styles from './Styles';
import CustomButton from '../../Components/CustomButton/CustomButton';

export default class Phone extends React.Component {
  constructor(props) {
    super(props);
    this.state = { Name: '' };
  }

  addPhoneButtonPress() {
  }

  render() {
    const buttonDisabled = (this.state.Name === '');

    return (

      <View style={styles.container}>
        <View>
          <View style={styles.containerStyle}>
            <Text style={styles.fontStyle}>
              Don't worry, we'll never
            </Text>
            <Text style={styles.fontStyle}>
              show your number.
            </Text>
          </View>
          <CustomTextInput
            placeholder=""
            label="Phone number"
            secureTextEntry={false}
            value={this.state.Name}
            onChangeText={(Name) => this.setState({ Name })}
            autoFocus={false}
          />
        </View>
        <KeyboardAvoidingView style={styles.ButtonContainer} keyboardVerticalOffset={0}>
          <KeyboardAvoidingView style={styles.ButtonBorder} behavior="padding">
            <View style={styles.ButtonStyle}>
              <CustomButton onPress={this.addPhoneButtonPress.bind(this)} marginSize={15} customFontSize={17} disabled={buttonDisabled}>Add Phone</CustomButton>
            </View>
          </KeyboardAvoidingView>
        </KeyboardAvoidingView>
      </View>
    );
  }
}