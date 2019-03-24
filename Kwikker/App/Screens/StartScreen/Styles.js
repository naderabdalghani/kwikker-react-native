import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  parentView: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  header: {
    alignItems: 'center',
  },
  headerImage: {
    height: 35,
    width: 35,
    marginTop: 10,
  },
  textButtonContainer: {
    alignItems: 'center',
  },
  startScreenText: {
    fontSize: 35,
    color: '#000',
    fontWeight: 'bold',
    marginLeft: 20,
    marginRight: 20,
    textAlign: 'center',
    marginBottom: 30,
  },
  logInContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch',
    marginLeft: 45,
    marginBottom: 30,
  },
  logInText: {
    fontSize: 15,
  },
  logInButton: {
    color: '#38A1F3',
    fontSize: 15,
  },
});
