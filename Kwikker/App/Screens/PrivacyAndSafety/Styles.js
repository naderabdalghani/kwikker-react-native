import { StyleSheet } from 'react-native';

let styles;
export default StyleSheet.create({
  container: {
    flex: 1,
  },
  subTitle: {
    padding: 20,
    fontSize: 20,
    color: '#657786',
    borderWidth: 1,
    borderColor: '#E1E8ED',
    fontWeight: 'bold'
  },
  subTitleContainer: {
    backgroundColor: '#E1E8ED',
    marginTop: 2
  },
  members: {
    padding: 10,
    fontSize: 15,
    color: '#14171A',
    borderWidth: 0.5,
    borderColor: '#E1E8ED',
  },
  box: {
    padding: 20,
    fontSize: 20,
    borderWidth: 1,
    borderColor: '#E1E8ED',
    fontWeight: 'bold'
  },
  blackFont: {
    color: '#14171A',
    fontSize: 15,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
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
    width: '70%',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  username: {
    fontSize: 14,
    color: '#657786',
  },

});