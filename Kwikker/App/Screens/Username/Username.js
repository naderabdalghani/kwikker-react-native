import React from 'react';
import { Text, View, Image } from 'react-native';
import CustomTextInput from '../../Components/CustomTextInput/CustomTextInput';
import styles from './Styles';
import CustomButton from '../../Components/CustomButton/CustomButton';

export default class Username extends React.Component {
  constructor(props) {
    super(props);
    this.state = { Name: '@Username' };
  }

  render() {
    return (

      <View>
        <View>
          <View>
            <Text style={styles.labelStyle}> Current </Text>
            <View style={styles.border}>
              <Text style={styles.labelStyle}>@Username </Text>
            </View>
          </View>
          <CustomTextInput
            placeholder=""
            label="New"
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