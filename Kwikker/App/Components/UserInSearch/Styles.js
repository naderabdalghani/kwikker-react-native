import { StyleSheet } from 'react-native';

let styles;
export default styles = StyleSheet.create({
  container: {
    flex: 1,
    borderColor: 'lightgray',
    borderWidth: 0.5,
    flexDirection: 'row',
    paddingTop: 10,
    paddingBottom: 10,

  },
  profilePicture: {
    height: 60,
    width: 60,
    borderRadius: 30,
    borderColor: 'lightgray',
    borderWidth: 1,
    overflow: 'hidden',
    margin: 10,
  },
  ProfileImage: {
    flex: 1, width: null, height: null
  },
  textContainer: {
    flex: 1,
    marginLeft: 30,
  },
  follow: {
    borderWidth: 1,
    borderColor: '#1DA1F2',
    width: '25%',
    height: 30,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: 'bold',
    backgroundColor: 'white',
    marginTop: 20,
    marginRight: 5,
  },
  following: {
    borderWidth: 1,
    borderColor: '#1DA1F2',
    width: '25%',
    height: 30,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: 'bold',
    backgroundColor: '#1DA1F2',
    marginTop: 20,
    marginRight: 5,
  },
  blocked: {
    borderWidth: 1,
    borderColor: '#000',
    width: '25%',
    height: 30,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: 'bold',
    backgroundColor: 'white',
    marginTop: 20,
    marginRight: 5,
  },
});