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
              <Image
     source={{
       uri: 'https://www.sparklabs.com/forum/styles/comboot/theme/images/default_avatar.jpg'
     }}
   />
              </View>

              <View style={{marginLeft :10,marginTop:4}}>
                <Text style={{ fontWeight :"bold", fontSize: 20, }}>
                  NAME
                </Text>
                <Text style={{color:'gray',}}>
                USERNAME
                </Text>
                <Text >
                ABOUT
                </Text>
              </View>
          
          
          </ScrollView>
                
        
      </View>
    );
  }
}
