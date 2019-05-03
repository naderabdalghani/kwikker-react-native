import { StyleSheet } from 'react-native';

let styles;
export default StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    height: 50
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
    width: '70%',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },

});