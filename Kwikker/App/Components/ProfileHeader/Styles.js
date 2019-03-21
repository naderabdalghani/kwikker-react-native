import { StyleSheet } from 'react-native';

export default styles = StyleSheet.create({
    Cover : {
        position:'absolute',
        top:0,
        left:0,
        right:0,
        backgroundColor:'lightskyblue',
        height: 120,
    },
    ProfileImageContainer:{
        height:80,
        width: 80,
        borderRadius: 80/2,
        borderColor: 'white',
        borderWidth: 3,
        overflow: 'hidden',
        marginTop: 120-(80/2),
        marginLeft: 10,
    },
    ProfileImage:{
        flex:1, width:null,height:null
    }
  });
