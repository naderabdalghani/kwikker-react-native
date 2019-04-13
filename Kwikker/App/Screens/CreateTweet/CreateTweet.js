import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Image, Button, StyleSheet, TextInput } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import axios from 'axios';
import CustomButton from '../../Components/CustomButton/CustomButton';
import Styles from './Styles';


export default class CreateTweet extends Component {
static navigationOptions = ({ navigation }) => {
  const { params = {} } = navigation.state;
  return {
    headerRight:
  <View style={{ marginRight: 10 }}>
    <CustomButton marginSize={10} customFontSize={15} disabled={params.buttonDisabled}>Kweek</CustomButton>
  </View>,
    headerBackImage:
  <Feather name="x" size={24} color="rgb(29, 161, 242)" />
  };
};

state = { text: '', count: 280 };

/**
 * Disable kweek button when kweek is over 280 charecters
 */
componentDidMount() {
  this.props.navigation.setParams({ buttonDisabled: (this.state.count <= 0) || (this.state.count === 280) });
}

/**
 * Handle submitting a kweek
 */
submitTweet() {
  axios.post('kweeks', {
    params: {
      text: this.state.text
    }
  });
}

render() {
  const maxLength = 280;
  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 10, flexDirection: 'row' }}>
        <View style={{ flex: 1 }}>
          <Image source={require('../../Assets/Images/pp.png')} style={{ width: 40, height: 40, borderRadius: 20, alignSelf: 'flex-start', marginTop: '15%', marginLeft: '15%' }} />
        </View>
        <View style={{ flex: 6 }}>
          <TextInput
            onChangeText={(t) => {
              this.setState({ text: t, count: maxLength - t.length });
              this.props.navigation.setParams({ buttonDisabled: (this.state.count <= 0) || (this.state.count === 280) });
            }}
            value={this.state.text}
            placeholder="What's happening?"
            placeholderTextColor="#657786"
            style={{ fontSize: 18 }}
            multiline
          />
        </View>
      </View>
      <View style={{ flex: 1, flexDirection: 'row', borderTopWidth: 0.75, borderTopColor: '#AAB8C2' }}>
        <Feather name="camera" size={36} color="rgb(29, 161, 242)" onPress={() => this.props.navigation.navigate('Camera')} style={{ marginLeft: '3%', marginTop: '1%' }}/>
        <Text style={{ marginLeft: '65%', marginTop: '4%' }}>{this.state.count} / 280</Text>
      </View>
    </View>
  );
}
}
