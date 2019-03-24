import { StyleSheet } from 'react-native';
let styles;
export default StyleSheet.create({
    container: {
        flex: 1,
    },
    developers:{
        padding:20, 
        fontSize:20, 
        color:'#657786', 
        borderWidth:1, 
        borderColor:'#E1E8ED', 
        fontWeight:'bold'
    },
    developersContainer:{
        backgroundColor:'#E1E8ED', 
        marginTop:2
    },
    members:{
        padding:10, 
        fontSize:15, 
        color:'#14171A',
        borderWidth:0.5, 
        borderColor:'#E1E8ED', 
    }
});