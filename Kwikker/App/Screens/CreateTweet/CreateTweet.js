import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Image, Button, StyleSheet, TextInput } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import CustomButton from '../../Components/CustomButton/CustomButton';
import Styles from './Styles';


export default class CreateTweet extends Component {
/*
  static navigationOptions = {
  headerRight:
  <Button title="tweet" style={{ marginRight: '5%', borderRadius: 20 }} />
};
*/
static navigationOptions = ({ navigation }) => {
  return {
    headerRight:
  <View style={{ marginRight: 10 }}>
    <CustomButton marginSize={10} customFontSize={15}>Kweek</CustomButton>
  </View>,
    headerBackImage:
  <Feather name="x" size={24} color="rgb(29, 161, 242)" />
  };
};

constructor(props) {
  super(props);
  this.state = { text: '' };
}


render() {
  return (
    <View style={{ flex: 1, flexDirection: 'row' }}>
      <View style={{ flex: 1 }}>
        <Image source={require('../../Assets/Images/pp.png')} style={{ width: 40, height: 40, borderRadius: 20, alignSelf: 'flex-start', marginTop: '15%', marginLeft: '15%' }} />
      </View>
      <View style={{ flex: 6 }}>
        <TextInput
          onChangeText={(text) => this.setState({ text })}
          value={this.state.text}
          placeholder="What's happening?"
          placeholderTextColor="#657786"
          style={{ fontSize: 18 }}
        />
      </View>

    </View>
  );
}
}
