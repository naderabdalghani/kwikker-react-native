import React, { Component } from 'react';
import { Text, View, Image, ScrollView } from 'react-native';

export default class Home extends Component
{
static navigationOptions = {
    headerLeft: <Image source={require('./../../Assets/Images/pp.jpg')} style={{ width:40, height:40, borderRadius:20, marginLeft:10 }} />
};
  constructor(props) {
      super(props);
  }
  
  render() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ScrollView>
              <Text>Home!</Text>
          </ScrollView>
          <Image source={require('./../../Assets/Images/tweet.png')} style={{ width:60, height:60, borderRadius:30, alignItems:'flex-end', marginLeft: '72%', marginBottom: '5%' }}/>

        </View>
    );
  }
}

