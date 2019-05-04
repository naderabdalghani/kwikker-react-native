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
  backButton: {
    height: 26,
    width: 26,
    marginTop: '5%',
    marginLeft: '10%',
  },
  createAccountText: {
    fontSize: 32,
    color: '#000',
    fontWeight: 'bold',
    marginTop: '5%',
    marginLeft: '10%',
    marginRight: '10%',
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
    marginTop: '3%',
    marginBottom: '3%',
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
    marginLeft: '10%',
  },
  successMessage: {
    fontSize: 15,
    color: 'green',
    marginTop: 0,
    marginLeft: '10%',
  },
  resendButton: {
    color: 'black',
    fontSize: 15,
    marginLeft: '10%',
    textDecorationLine: 'underline'
  },
  datePickerContainer: {
    flex: 1,
    alignItems: 'center',
  },
  datePickerText: {
    color: 'black',
    fontSize: 20,
  },
  datePickerPlaceholder: {
    color: '#9e9e9e',
    fontSize: 18,
  },
  dateText: {
    fontSize: 20,
    color: '#9e9e9e',
    alignSelf: 'center',
  },
  dateContainer: {
    alignSelf: 'center',
    flexDirection: 'row',
    marginLeft: '10%',
    marginRight: '10%',
    marginTop: '2.5%',
    borderBottomWidth: 1,
    borderBottomColor: '#AAB8C2',
  },
});
