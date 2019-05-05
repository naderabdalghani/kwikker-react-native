import { StyleSheet } from 'react-native';

let styles;
export default styles = StyleSheet.create({
  notificationContainer: {
    flex: 1,
    height: 150,
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
    marginTop: 10,
    marginLeft: 40,
  },
  ProfileImage: {
    flex: 1, width: null, height: null
  },
  textContainer: {
    flex: 1,
    marginLeft: 40,
  },
  textHeader: {
    flex: 1,
    flexDirection: 'row',
    marginRight: 10,
    marginTop: 10,
  },
  textContent: {
    flex: 1,
    marginBottom: 40,
    marginRight: 10,

    color: 'lightgray'
  },
});
