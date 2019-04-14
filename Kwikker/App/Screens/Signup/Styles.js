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
    height: 26,
    width: 26,
    marginTop: 10,
    marginLeft: 12,
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
    justifyContent: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dummyElement: {
    flex: 1,
  },
  submitButtonStyle: {
    alignItems: 'flex-end',
    marginTop: 12,
    marginBottom: 12,
  },
  submitButtonBorder: {
    borderTopWidth: 0.75,
    borderTopColor: '#AAB8C2',
    backgroundColor: 'white',
  },
  submitButtonContainer: {
    justifyContent: 'flex-end',
    flex: 1,
  },
  textInputsContainer: {
    height: '50%',
  },
  errorMessage: {
    fontSize: 15,
    color: 'red',
    marginTop: 0,
    marginLeft: 40,
  },
  successMessage: {
    fontSize: 15,
    color: 'green',
    marginTop: 0,
    marginLeft: 40,
  },
});
