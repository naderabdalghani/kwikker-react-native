import React from 'react';
import {  Text, View,Image } from 'react-native';
import styles from './Styles';

export default class Notification extends React.Component {
  constructor(props) {
    super(props);
    
  }

  render() {
    return (  
       
      <View style={styles.notificationContainer} >     
        <View style={styles.profilePicture}> 
        <Image style={styles.ProfileImage} source={{uri: this.props.profileUrl}}/>
        </View>
            <View style={styles.textContainer}>
            <View style={styles.textHeader}>
                  <Text style={{fontWeight:"bold"}} >{this.props.screenName}</Text>
                  <Text> {this.props.type}</Text> 
                     
            </View>
            <Text style={styles.textContent}>{this.props.kweekText}</Text>
          </View> 
      </View>
    );
  }
}



