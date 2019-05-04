import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  parentView: {
    height: '100%',
  },
  backButton: {
    height: 26,
    width: 26,
    marginTop: '10%',
    marginLeft: '15%',
    marginBottom: 7,
  },
  changePasswordText: {
    fontSize: 20,
    color: '#000',
    marginLeft: '5%',
    fontWeight: 'bold',
  },
  changePasswordTextContainer: {
    justifyContent: 'center',
  },
  backButtonContainer: {
    justifyContent: 'center',
  },
  header: {
    flexDirection: 'row',
    backgroundColor: '#F8F8F8',
    height: 55,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    elevation: 2,
  },
  Text1Style: {
    fontSize: 20,
    color: '#000',
    marginTop: '5%',
    marginLeft: '3.75%',
    fontWeight: 'bold',
  },
  Text2Style: {
    fontSize: 15,
    color: '#000',
    marginTop: '5%',
    marginLeft: '3.75%',
  },
  errorMessage: {
    fontSize: 20,
    color: 'red',
    marginTop: '5%',
    marginLeft: '3.75%',
  },
  successMessage: {
    fontSize: 20,
    color: 'green',
    marginTop: '5%',
    marginLeft: '3.75%',
  },
  searchButtonStyle: {
    alignItems: 'flex-start',
    marginTop: '7.5%',
    marginBottom: '3%',
    marginLeft: '2.5%',
  },
  textInputsContainer: {
    width: '75%',
  },
});
