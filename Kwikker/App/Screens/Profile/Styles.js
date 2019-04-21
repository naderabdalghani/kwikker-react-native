import { StyleSheet } from 'react-native';

let styles;
export default styles = StyleSheet.create({
  backButton: {
    height: 30,
    width: 30,
    marginLeft: 12,
    zIndex: 9,
  },
  bbcontainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(29, 161, 242, 0.0)',
    //backgroundColor: 'rgba(55, 55, 55, 0.5)',
    height: 50,
    justifyContent: 'center',
    zIndex: 10,
  },
  fackTabContainer: {
    flexDirection: 'row',
  },
  fackTab: {
    width: '25%',
    alignItems: 'center',

  },
  indicator: {
    height: 2,
    width: '100%',
  },
  indicatorActive: {
    backgroundColor: '#1DA1F2',
  },
  indicatorInActive: {
    backgroundColor: '#fff',
  },
  tabLable: {
    fontWeight: 'bold',
    paddingVertical: 15,
  },
  tabLableActive: {
    color: '#1DA1F2',
  },
  tabLableInActive: {
    color: '#657786',
  },
  line: {
    height: 1,
    backgroundColor: '#AAB8C2',
    width: '100%',
  },
  tabContentContainer: {
    alignItems: 'center',
    alignContent: 'center'
  },
  tabContent: {
    fontSize: 30
  },
});
