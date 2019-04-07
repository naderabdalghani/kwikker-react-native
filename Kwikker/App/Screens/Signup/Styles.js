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
  backButton: {
    height: 25,
    width: 25,
    marginTop: 10,
    marginLeft: 12,
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
  createAccountText: {
    fontSize: 32,
    color: '#000',
    fontWeight: 'bold',
    marginTop: 20,
    marginLeft: 40,
    marginRight: 40,
  },
  imageContainer: {
    flex: 1,
    alignItems: 'center',
  },
  backButtonContainer: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dummyElement: {
    flex: 1,
  },
  nextButtonStyle: {
    alignItems: 'flex-end',
    marginTop: 12,
    marginBottom: 12,
  },
  nextButtonBorder: {
    borderTopWidth: 0.75,
    borderTopColor: '#AAB8C2',
  },
  nextButtonContainer: {
    justifyContent: 'flex-end',
    flex: 1,
  },
});
