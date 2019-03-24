import { StyleSheet } from 'react-native';
// import { shouldInstrument } from 'jest-runtime';
export default StyleSheet.create({
  container: {
    flex: 1,
    alignContent: 'center',
  },
  top: {
    flex: 1,
    fontSize: 25,
    color: '#000',
    fontWeight: 'bold',
    marginLeft: 20,
    marginRight: 20,
    borderBottomColor: 'rgb(136, 153, 166)',
    borderBottomWidth: 0.5
  },
  bottom: {
    flex: 2,
  },
  photo: {
    alignContent: 'flex-start',
    width: 60,
    height: 60,
    borderRadius: 30,
    marginTop: '5%',
    marginBottom: '5%'
  },
  userName: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#000'
  },
  userHandle: {
    color: 'rgb(136, 153, 166)',
  },
  followingCount: {
    color: '#000',
    fontWeight: 'bold',
    flex: 1
  },
  followersCount: {
    color: '#000',
    fontWeight: 'bold',
    flex: 1
  },
  followingCountText: {
    color: 'rgb(136, 153, 166)',
    fontWeight: 'normal'
  },
  followersCountText: {
    color: 'rgb(136, 153, 166)',
    fontWeight: 'normal'
  },
  text: {
    fontSize: 20,
    color: '#000',
    marginLeft: 20,
    marginRight: 20,
    marginTop: '10%'
  }
});
