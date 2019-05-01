import { StyleSheet } from 'react-native';

let styles;
export default styles = StyleSheet.create({
  Cover: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: '#1DA1F2',
    height: 120,
    zIndex: -1,
  },
  ProfileImageContainer: {
    height: 80,
    width: 80,
    borderRadius: 80 / 2,
    borderColor: 'white',
    borderWidth: 3,
    overflow: 'hidden',
    marginTop: 120 - (80 / 2),
    marginLeft: 10,
  },
  ProfileImage: {
    flex: 1, width: null, height: null
  },
  Gray: {
    color: '#657786',
    padding: 3,
  },
  EditProfile: {
    borderWidth: 1,
    borderColor: '#657786',
    width: '30%',
    height: 30,
    marginTop: 130,
    marginLeft: '42%',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: 'bold',
    backgroundColor: 'white',
  },
  backButton: {
    height: 30,
    width: 30,
    marginLeft: 12,
  },
  following: {
    borderWidth: 1,
    borderColor: '#1DA1F2',
    width: '30%',
    height: 30,
    marginTop: 130,
    marginLeft: '42%',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: 'bold',
    backgroundColor: '#1DA1F2',
    marginRight: 5,
  },
  blocked: {
    borderWidth: 1,
    borderColor: 'red',
    width: '30%',
    height: 30,
    marginTop: 130,
    marginLeft: '42%',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: 'bold',
    backgroundColor: 'white',
    marginRight: 5,
  },
  follow: {
    borderWidth: 1,
    borderColor: '#1DA1F2',
    width: '30%',
    height: 30,
    marginTop: 130,
    marginLeft: '42%',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: 'bold',
    backgroundColor: '#fff',
    marginRight: 5,
  },
});
