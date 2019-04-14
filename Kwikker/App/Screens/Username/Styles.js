import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1
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
    marginTop: 12,
    marginBottom: 12,
  },
  ButtonBorder: {
    borderTopWidth: 0.75,
    borderTopColor: '#AAB8C2',
  },
  ButtonContainer: {
    justifyContent: 'flex-end',
    flex: 1,
  },
  backButtonContainer: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  backButton: {
    height: 30,
    width: 30,
    marginLeft: 12,
  },
  dummyElement: {
    flex: 1,
  },
  titleContainer: {
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    marginTop: 5,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    height: 50,
    borderBottomWidth: 1,
    borderBottomColor: '#AAB8C2',
  },
});
