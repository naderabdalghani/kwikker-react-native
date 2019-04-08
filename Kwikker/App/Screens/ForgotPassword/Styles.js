import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  parentView: {
    height: '100%',
  },
  backButton: {
    height: 26,
    width: 26,
    marginTop: 10,
    marginLeft: 12,
    marginBottom: 7,
  },
  changePasswordText: {
    fontSize: 20,
    color: '#000',
    marginLeft: 30,
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
    marginTop: 20,
    marginLeft: 15,
    fontWeight: 'bold',
  },
  Text2Style: {
    fontSize: 15,
    color: '#000',
    marginTop: 20,
    marginLeft: 15,
  },
  searchButtonStyle: {
    alignItems: 'flex-start',
    marginTop: 30,
    marginBottom: 12,
    marginLeft: 10,
  },
  textInputsContainer: {
    width: '75%',
  },
});
