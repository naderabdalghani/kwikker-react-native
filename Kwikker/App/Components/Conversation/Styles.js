import { StyleSheet } from 'react-native';

let styles;
export default styles = StyleSheet.create({
  conversationContainer: {
    flex: 1,
    height: 120,
    borderColor: 'lightgray',
    borderWidth: 0.5,
  },
  profilePicture: {
    height: 50,
    width: 50,
    borderRadius: 50 / 2,
    borderColor: 'lightgray',
    borderWidth: 1,
    overflow: 'hidden',
    marginLeft: 10

  },
  ProfileImage: {
    flex: 1, width: null, height: null
  },
  headerContainer: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 10,
  },
  textHeader: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 15,
    marginLeft: 10
  },
  textContent: {
    marginLeft: 15,
    marginRight: 15,
    marginBottom: 10
  },
  textTime: {
    alignSelf: 'flex-end',
    marginRight: 10,

  },
});
