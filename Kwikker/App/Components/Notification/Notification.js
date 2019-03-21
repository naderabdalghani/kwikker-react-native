import React from 'react';
import {  Text, View } from 'react-native';
import styles from './Styles';

export default class Notification extends React.Component {
  render() {
    return (      
      <View style={styles.notificationContainer} >     
        <View style={styles.profilePicture}>       
        </View>
            <View style={styles.textContainer}>
            <View style={styles.textHeader}>
                  <Text style={{fontWeight:"bold"}} >NAME!</Text>
                  <Text> TYPE!</Text> 
                     <Text> from </Text><Text> NAME2! </Text>
            </View>
            <Text style={styles.textContent}>CONTANT!</Text>
          </View> 
      </View>
    );
  }
}



