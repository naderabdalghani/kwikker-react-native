import { StyleSheet } from 'react-native';

let styles;
export default styles = StyleSheet.create({
  accountContainer: {
    flex: 1,
    height: 150,
    borderColor: '#E1E8ED',
    borderWidth: 0.5,
  },
  profilePicture: {
    height: 50,
    width: 50,
    borderRadius: 50 / 2,
    borderColor: '#E1E8ED',
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
    marginTop: 10,
  },
  textContent: {
    marginBottom: 40,
    color: '#E1E8ED'
  },
});
