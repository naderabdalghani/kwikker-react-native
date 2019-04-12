import React from 'react';
import { Text, View, Image, KeyboardAvoidingView } from 'react-native';
import CustomTextInput from '../../Components/CustomTextInput/CustomTextInput';
import styles from './Styles';
import CustomButton from '../../Components/CustomButton/CustomButton';

export default class Email extends React.Component {
  constructor(props) {
    super(props);
    this.state = { Name: '@Email' };
  }


  nextButtonPress() {
  }

  render() {
    return (

      <View style={styles.container}>
        <View>
          <View>
            <Text style={styles.labelStyle}> Current </Text>
            <View style={styles.border}>
              <Text style={styles.labelStyle}>@Email </Text>
            </View>
          </View>
          <CustomTextInput
            placeholder=""
            label="Email address"
            secureTextEntry={false}
            value={this.state.Name}
            onChangeText={(Name) => this.setState({ Name })}
            autoFocus={false}
          />
        </View>
        <KeyboardAvoidingView style={styles.ButtonContainer} keyboardVerticalOffset={0}>
          <KeyboardAvoidingView style={styles.ButtonBorder} behavior="padding">
            <View style={styles.ButtonStyle}>
              <CustomButton onPress={this.nextButtonPress.bind(this)} marginSize={15} customFontSize={17}>Next </CustomButton>
            </View>
          </KeyboardAvoidingView>
        </KeyboardAvoidingView>
      </View>
    );
  }
}