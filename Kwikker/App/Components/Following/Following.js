import React from 'react';
import { StyleSheet, Text, View,Image } from 'react-native';


export default class Notification extends React.Component {
  constructor(props) {
    super(props);
    
  }

  render() {
    return (  
       
      <View style={styles.container} >     
        <View style={styles.profilePicture}> 
          <Image style={styles.ProfileImage} source={{uri: this.props.profileUrl}}/>
        </View>
        <View style={styles.textContainer}>
          <Text style={{fontWeight:"bold"}} >name</Text>
          <Text style={{color:'gray'}}>userName</Text>
          <Text >about</Text>
        </View> 
        <View style={styles.following}>
            <Text style={{color:'white', fontWeight:'bold'}}>
            Following
            </Text>
           
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container : {
        flex: 1,    
        height: 120,
        borderColor:"lightgray",
        borderWidth: 1,
        flexDirection:'row',
        paddingTop:20,
    },
    profilePicture : {
        height:80,
        width: 80,
        borderRadius: 40,
        borderColor: 'lightgray',
        borderWidth: 1,
        overflow: 'hidden',
        marginLeft: 10,
    },
    ProfileImage:{
        flex:1, width:null,height:null
    },
    textContainer : {
        flex: 1,   
        marginLeft: 40,
    },
    
    
     following:{
      borderWidth:2,
      borderColor: 'lightgray', 
      width:120, height:40, 
      borderRadius:20, 
      justifyContent:'center', 
      alignItems:'center', 
      fontWeight:'bold', 
      backgroundColor:'blue',
      marginTop:10,

    },
});










