import React, { Component } from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import {NavigationActions, DrawerActions} from 'react-navigation';
import Styles from './Styles'

export default class DrawerNavContainer extends Component
{

  constructor(props) {
    super(props);
    
  }

  render() {
      
    const {navigation} = this.props
    return (
        <View style={Styles.container}>
            <View style={Styles.top}>
                <TouchableOpacity  onPress={() => this.props.navigation.navigate('Profile')} style={{flex: 3}}>
                <Image 
                    source={require('./../../Assets/Images/pp.jpg')}
                    style={Styles.photo}
                />
                <Text style={Styles.userName}>Shady</Text>
                <Text style={Styles.userHandle}>@shady_fahmy97</Text>
                </TouchableOpacity>
                <View style={{flex: 1, flexDirection: 'row'}}> 
                    <Text style={Styles.followingCount}>500
                        <Text style={Styles.followingCountText}>{' '}Following</Text>
                    </Text>
                    <Text style={Styles.followersCount}>1500
                        <Text style={Styles.followersCountText}>{' '}Follower</Text>
                    </Text>
                </View>
                    
            </View>
            <View style={Styles.bottom}>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('Profile')}>
                    <Text style={Styles.text}> Profile </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('Settings')}>
                    <Text style={Styles.text}> Settings and privacy </Text> 
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('StartScreen')}>
                    <Text style={Styles.text}> Logout </Text>
                </TouchableOpacity>       
            </View>
        </View>
    );
  }
}

