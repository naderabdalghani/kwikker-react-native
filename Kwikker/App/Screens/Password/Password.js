import React from 'react';
import { Text, View, Image, TouchableOpacity, ScrollView } from 'react-native';
import CustomTextInput from '../../Components/CustomTextInput/CustomTextInput';
import styles from './Styles';
import CustomButton from '../../Components/CustomButton/CustomButton';

export default class Password extends React.Component {
  constructor(props) {
    super(props);
    this.state = { Current: '', New: '', Confirm: '' };
  }

  render() {
    return (

      <View style={styles.container}>
        <ScrollView>
          <View>
            <View style={styles.upperPart}>
              <CustomTextInput
                placeholder=""
                label="Current password"
                secureTextEntry
                value={this.state.Current}
                onChangeText={(Current) => this.setState({ Current })}
                autoFocus={false}
              />
              <CustomTextInput
                placeholder="At least 6 characters"
                label="New password"
                secureTextEntry
                value={this.state.New}
                onChangeText={(New) => this.setState({ New })}
                autoFocus={false}
              />
              <CustomTextInput
                placeholder="At least 6 characters"
                label="Confirm password"
                secureTextEntry
                value={this.state.Confirm}
                onChangeText={(Confirm) => this.setState({ Confirm })}
                autoFocus={false}
              />
            </View>
            <View style={styles.aligneCenter}>
              <TouchableOpacity style={styles.UpdatePasswordContainer}>
                <Text style={styles.UpdatePasswordText}> UPDATE PASSWORD </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}