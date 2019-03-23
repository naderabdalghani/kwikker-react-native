import { StyleSheet } from 'react-native';

let styles;
export default styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 120,
    borderColor: 'lightgray',
    borderWidth: 1,
    flexDirection: 'row',
    paddingTop: 20,
  },
  profilePicture: {
    height: 80,
    width: 80,
    borderRadius: 40,
    borderColor: 'lightgray',
    borderWidth: 1,
    overflow: 'hidden',
    marginLeft: 10,
  },
  ProfileImage: {
    flex: 1, width: null, height: null
  },
  textContainer: {
    flex: 1,
    marginLeft: 40,
  },


  follow: {
    borderWidth: 2,
    borderColor: 'lightgray',
    width: 120,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: 'bold',
    backgroundColor: 'gray',
    marginTop: 10,

  },

});