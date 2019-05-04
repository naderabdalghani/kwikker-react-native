import React from 'react';
import { Text, View, Image, TouchableNativeFeedback, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Styles from './Styles';


export default class PrivecyAndSafety extends React.Component {
  constructor(props) {
    super(props);
    this.state = { currentUsername: '' };
  }

  componentDidMount() {
    AsyncStorage.getItem('@app:id').then((id) => {
      this.setState({ currentUsername: id });
    });
    this.willFocusListener = this.props.navigation.addListener(
      'willFocus',
      () => {
        AsyncStorage.getItem('@app:id').then((id) => {
          this.setState({ currentUsername: id });
        });
      }
    );
  }

  BlockedAccounts() {
    this.props.navigation.navigate('BlockedAccounts');
  }

  MutedAccounts() {
    this.props.navigation.navigate('MutedAccounts');
  }

  render() {
    return (

      <View style={Styles.container}>
        <View>
          <View style={Styles.header}>
            <View style={Styles.backButtonContainer}>
              <TouchableNativeFeedback onPress={() => this.props.navigation.goBack(null)}>
                <Image
                  style={Styles.backButton}
                  source={require('./../../Assets/Images/back_button.png')}
                />
              </TouchableNativeFeedback>
            </View>
            <View style={Styles.titleContainer}>
              <Text style={Styles.title}>Privacy and safety</Text>
              <Text style={Styles.username}>@{this.state.currentUsername}</Text>
            </View>
            <View />
            <View style={Styles.dummyElement} />
          </View>


          <View style={Styles.subTitleContainer}>
            <Text style={Styles.subTitle}>
              Safety
            </Text>
          </View>

          <View style={Styles.box}>
            <TouchableOpacity onPress={this.BlockedAccounts.bind(this)}>
              <Text style={Styles.blackFont}> Blocked accounts </Text>
            </TouchableOpacity>
          </View>

          <View style={Styles.box}>
            <TouchableOpacity onPress={this.MutedAccounts.bind(this)}>
              <Text style={Styles.blackFont}> Muted accounts </Text>
            </TouchableOpacity>
          </View>

        </View>
      </View>
    );
  }
}
