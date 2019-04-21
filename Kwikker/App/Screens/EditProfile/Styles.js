import { StyleSheet } from 'react-native';

let styles;
export default styles = StyleSheet.create({
  Cover: {
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: '#1DA1F2',
    height: 120,
  },
  ProfileImageContainer: {
    height: 80,
    width: 80,
    borderRadius: 80 / 2,
    borderColor: 'white',
    borderWidth: 3,
    overflow: 'hidden',
    marginTop: 120 - (80 / 2),
    marginLeft: 10,
  },
  ProfileImage: {
    flex: 1, width: null, height: null
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
