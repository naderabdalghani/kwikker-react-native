import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  ParentView: {
    height: '100%',
  },
  HeaderImage: {
    height: 35,
    width: 35,
    marginTop: 10,
  },
  SignUpButton: {
    fontSize: 17,
    color: '#1DA1F2',
    textAlign: 'center',
    alignSelf: 'center',
    marginTop: 10,
    fontWeight: 'bold',
    flex: 1,
  },
  LogInText: {
    fontSize: 25,
    color: '#000',
    fontWeight: 'bold',
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
  },
  ImageContainer: {
    flex: 1,
    alignItems: 'center',
  },
  Header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  DummyElement: {
    flex: 1,
  },
  LogInButtonStyle: {
    alignItems: 'flex-end',
    marginTop: 10,
    marginBottom: 10,
  },
  LoginButtonBorder: {
    borderTopWidth: 0.75,
    borderTopColor: '#AAB8C2',
  },
  LoginButtonContainer: {
    justifyContent: 'flex-end',
    flex: 1,
  },
  ForgotPasswordStyle: {
    color: '#657786',
    alignSelf: 'center',
    marginTop: 10,
  },
});
