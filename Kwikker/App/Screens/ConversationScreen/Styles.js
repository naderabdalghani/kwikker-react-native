
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  header: {
    color: 'black',
    fontWeight: 'bold'
  },
  userImage: {
    width: 35,
    height: 35,
    borderRadius: 20,
    margin: 5,
    paddingBottom: 0,
    alignSelf: 'flex-end'
  },
  messageButton: {
    width: '10%',
    height: 40,
    borderLeftWidth: 1,
    marginBottom: 5,
    paddingLeft: 10,
    alignSelf: 'flex-end'
  },
  buttomImage: {
    width: 40,
    height: 40,
    alignSelf: 'center'
  },
  otherMessage: {
    maxWidth: '75%',
    alignSelf: 'flex-start',
    backgroundColor: '#E1E8ED',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    padding: 5,
    margin: 5,
  },
  message: {

    marginLeft: 'auto',
    maxWidth: '75%',
    alignSelf: 'flex-end',
    backgroundColor: '#1DA1F2',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    padding: 5,
    margin: 5,

  },
  messageTime: {
    marginLeft: 50,
    backgroundColor: 'white',
    color: 'gray',
    padding: 0,
    fontSize: 12
  },
  textInput: {
    width: '65%',
    margin: 10,
    borderBottomWidth: 1,
  }

});