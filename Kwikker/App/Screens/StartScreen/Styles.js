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
    marginTop: '2.5%',
  },
  textButtonContainer: {
    alignItems: 'center',
  },
  startScreenText: {
    fontSize: 35,
    color: '#000',
    fontWeight: 'bold',
    marginLeft: '5%',
    marginRight: '5%',
    textAlign: 'center',
    marginBottom: '7.5%',
  },
  logInContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch',
    marginLeft: '11.25%',
    marginBottom: '5.5%',
  },
  logInText: {
    fontSize: 15,
  },
  logInButton: {
    color: '#38A1F3',
    fontSize: 15,
  },
});
