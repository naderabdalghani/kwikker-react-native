import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  parentView: {
    height: '100%',
  },
  headerImage: {
    height: 35,
    width: 35,
    marginTop: 10,
  },
  signUpButton: {
    fontSize: 17,
    color: '#1DA1F2',
    textAlign: 'center',
    alignSelf: 'center',
    marginTop: 10,
    fontWeight: 'bold',
    flex: 1,
  },
  logInText: {
    fontSize: 25,
    color: '#000',
    fontWeight: 'bold',
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
  },
  imageContainer: {
    flex: 1,
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dummyElement: {
    flex: 1,
  },
  logInButtonStyle: {
    alignItems: 'flex-end',
    marginTop: 10,
    marginBottom: 10,
  },
  loginButtonBorder: {
    borderTopWidth: 0.75,
    borderTopColor: '#AAB8C2',
    backgroundColor: 'white',
  },
  loginButtonContainer: {
    justifyContent: 'flex-end',
    flex: 1,
  },
  forgotPasswordStyle: {
    color: '#657786',
    alignSelf: 'center',
    marginTop: 10,
  },
});
