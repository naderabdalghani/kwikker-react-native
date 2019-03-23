import { StyleSheet } from 'react-native';

let styles;
export default styles = StyleSheet.create({
    container : {
        flex: 1,    
        height: 120,
        borderColor:"lightgray",
        borderWidth: 0.5,
        flexDirection:'row',
        paddingTop:10,
    },
    profilePicture : {
        height:60,
        width: 60,
        borderRadius: 30,
        borderColor: 'lightgray',
        borderWidth: 1,
        overflow: 'hidden',
        marginLeft: 10,
        marginTop:20,
    },
    ProfileImage:{
        flex:1, width:null,height:null
    },
    textContainer : {
        flex: 1,   
        marginLeft: 40,
    },
        following:{
        borderWidth:1,
        borderColor: '#1DA1F2', 
        width:'25%', 
        height:30, 
        borderRadius:20, 
        justifyContent:'center', 
        alignItems:'center', 
        fontWeight:'bold', 
        backgroundColor:'#1DA1F2',
        marginTop:10,


  following: {
    borderWidth: 2,
    borderColor: 'lightgray',
    width: 120,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: 'bold',
    backgroundColor: 'blue',
    marginTop: 10,

  },

});