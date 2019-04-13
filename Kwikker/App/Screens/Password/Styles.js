import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E1E8ED',
  },
  upperPart: {
    backgroundColor: '#fff',
  },
  labelStyle: {
    fontSize: 16,
    paddingLeft: 10,
    color: '#AAB8C2',
  },
  border: {
    width: '96%',
    marginLeft: '2%',
    borderBottomWidth: 1.5,
    borderBottomColor: '#AAB8C2',
    paddingBottom: '2%',
    marginBottom: '10%',
  },
  ButtonStyle: {
    alignItems: 'flex-end',
    marginTop: 10,
    marginBottom: 10,
  },
  ButtonBorder: {
    borderTopWidth: 0.75,
    borderTopColor: '#AAB8C2',
  },
  ButtonContainer: {
    justifyContent: 'flex-end',
    flex: 1,
  },
  UpdatePasswordText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
    paddingVertical: 9,
  },
  UpdatePasswordContainer: {
    flex: 1,
    alignItems: 'center',
    width: '96%',
    backgroundColor: '#1DA1F2',
    marginTop: 5,
    borderRadius: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4,
  },
  valid: {
    backgroundColor: '#1DA1F2',
  },
  invalid: {
    backgroundColor: '#AAB8C2',
  },
  aligneCenter: {
    alignItems: 'center',
  }
});
