import { StyleSheet } from 'react-native';

let styles;
export default styles = StyleSheet.create({
  Cover: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: 'lightskyblue',
    height: 120,
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
    color: 'gray'
  },
  EditProfile: {
    borderWidth: 2,
    borderColor: 'lightgray',
    width: 120,
    height: 40,
    marginTop: 100,
    marginLeft: 120,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: 'bold',
    backgroundColor: 'white',
  },
});
