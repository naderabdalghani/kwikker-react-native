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
  },
  bottom: {
    flex: 2,
    borderTopColor: 'rgb(136, 153, 166)',
    borderTopWidth: 0.5
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
    color: '#657786',
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
    color: '#657786',
    fontWeight: 'normal'
  },
  followersCountText: {
    color: '#657786',
    fontWeight: 'normal'
  },
  text: {
    fontSize: 20,
    color: '#000',
    marginLeft: '2%',
    //marginRight: 20,
    marginTop: '10%'
  },
  button: {
    flexDirection: 'row'
  },
  icon: {
    marginTop: '10%',
    marginLeft: '5%',
  }
});
