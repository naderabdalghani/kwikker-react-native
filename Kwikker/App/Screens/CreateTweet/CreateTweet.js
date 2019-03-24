import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Image, Button, StyleSheet, TextInput } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import Styles from './Styles';

export default class CreateTweet extends Component {
static navigationOptions = {
  headerRight:
  <Button title="tweet" style={{ marginRight: '5%', borderRadius: 20 }} />
};

constructor(props) {
  super(props);
  this.state = { text: 'write tweet' };
}

render() {
  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1, flexDirection: 'row' }}>
        <Image source={require('../../Assets/Images/pp.png')} style={{ width: 40, height: 40, borderRadius: 20, alignSelf: 'flex-start', marginTop: '3%', marginLeft: '3%' }} />
      </View>
      <View style={{ flex: 4, flexDirection: 'row' }}>
        <TextInput
          onChangeText={(text) => this.setState({ text })}
          value={this.state.text}
        />
      </View>

    </View>
  );
}
}
