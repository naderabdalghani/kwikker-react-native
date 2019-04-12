import React from 'react';
import { Text, View, Image } from 'react-native';
import CustomTextInput from '../../Components/CustomTextInput/CustomTextInput';
import styles from './Styles';
import CustomButton from '../../Components/CustomButton/CustomButton';

export default class Phone extends React.Component {
  constructor(props) {
    super(props);
    this.state = { Name: '' };
  }

  render() {
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
      </View>
    );
  }
}