import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  parentView: {
    height: '100%',
  },
  headerImage: {
    height: 35,
    width: 35,
    marginTop: '5%',
  },
  signUpButton: {
    fontSize: 17,
    color: '#1DA1F2',
    textAlign: 'center',
    alignSelf: 'center',
    marginTop: '5%',
    fontWeight: 'bold',
    flex: 1,
  },
  logInText: {
    fontSize: 25,
    color: '#000',
    fontWeight: 'bold',
    marginLeft: '2.5%',
    marginRight: '2.5%',
    marginBottom: '2.5%',
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
    marginTop: '2.5%',
    marginBottom: '2.5%',
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
    marginTop: '2.5%',
  },
  messageStyle: {
    color: '#657786',
    fontSize: 15,
    marginTop: '5%',
    marginLeft: '5%',
  },
  resendButton: {
    color: 'black',
    fontSize: 15,
    marginLeft: '5%',
    textDecorationLine: 'underline'
  },
});
