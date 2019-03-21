import React from 'react';
import {  Text, View,Image } from 'react-native';
import styles from './Styles';

export default class Notification extends React.Component {
  constructor(props) {
    super(props);
    this.state=
    {
      type:""
    }
    
  }
/** Set type of notification when it's loaded.*/
  setType()
  {
    switch(this.props.type) {
      case "LIKE":
        this.setState({
          type:"liked your kweek"
        })
        break;

      case "REKWEEK":
      this.setState({
        type:"rekweek your kweek"
      })
        break;

      case "FOLLOW":
      this.setState({
        type:"followed you"
      })
        break;

      case "REPLY":
      this.setState({
        type:"replied on your kweek"
      })
        break;

      case "MESSAGE":
      this.setState({
        type:"messaged you"
      })
        break;
          
      default:
      this.setState({
        type:"notification"
      })
    }

  }
  componentDidMount()
  {
    this.setType();

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
                  <Text> {this.state.type}</Text> 
                     
            </View>
            <Text style={styles.textContent}>{this.props.kweekText}</Text>
          </View> 
      </View>
    );
  }
}



