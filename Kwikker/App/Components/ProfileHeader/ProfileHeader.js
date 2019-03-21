import React from 'react';
import { Text, View,ScrollView,Image} from 'react-native';
import styles from './Styles';






export default class App extends React.Component {

  render() {
    return (
      
      <View style={{flex:1}} >
          <View style={styles.Cover} >
          </View>
        
          <ScrollView style={{flex:1}}>
          
              <View style={styles.ProfileImageContainer}>
              <Image style={styles.ProfileImage}
     source={{
       uri: 'https://www.sparklabs.com/forum/styles/comboot/theme/images/default_avatar.jpg'
     }}
   />
              </View>

              <View style={{marginLeft :10,marginTop:4}}>
                <Text style={{ fontWeight :"bold", fontSize: 20, }}>
                  NAME
                </Text>
                <Text style={styles.Gray}>
                USERNAME
                </Text>
                <Text >
                ABOUT
                </Text>
                <View style={{flex:1,flexDirection:'row'}}> 
                  <Text style={styles.Gray}>Joined </Text>
                  <Text style={styles.Gray}>date</Text>
                </View>
               
                <View style={{flex:1,flexDirection:'row'}}>
                  <Text>0</Text>
                  <Text style={styles.Gray}> Following   </Text>
                  <Text>0</Text>
                  <Text style={styles.Gray}> Followers   </Text>
                </View>
              </View>
          
          
          </ScrollView>
                
        
      </View>
    );
  }
}
