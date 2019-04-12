import React, { Component } from 'react';
import { Text, View, Image, ScrollView, TouchableOpacity } from 'react-native';
import Kweek from '../../Components/Kweek/Kweek';

export default class Home extends Component {
static navigationOptions = {
  headerLeft:
  <TouchableOpacity>
    <Image source={require('./../../Assets/Images/pp.png')} style={{ width: 40, height: 40, borderRadius: 20, marginLeft: 10 }} />
  </TouchableOpacity>
};

constructor(props) {
  super(props);
}

render() {
  return (
    <View style={{ flex: 1 }}>
      <ScrollView>
        <Kweek />
      </ScrollView>
      <TouchableOpacity onPress={() => this.props.navigation.navigate('CreateTweet')}>
        <Image source={require('./../../Assets/Images/tweet1.png')} style={{ width: 60, height: 60, borderRadius: 30, alignItems: 'flex-end', marginLeft: '72%', marginBottom: '5%' }} />
      </TouchableOpacity>
    </View>
  );
}
}
