import React, { Component } from 'react';
import { Text, View, TouchableOpacity, ScrollView, Image } from 'react-native';

export default class Messages extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ScrollView>
          <Text>Messages!</Text>
        </ScrollView>
        <TouchableOpacity>
          <Image source={require('./../../Assets/Images/Message1.png')} style={{ width: 60, height: 60, borderRadius: 30, alignItems: 'flex-end', marginLeft: '72%', marginBottom: '5%' }} />
        </TouchableOpacity>
      </View>
    );
  }
}
