import { StyleSheet } from 'react-native';

let styles;
export default styles = StyleSheet.create({
  backButton: {
    height: 30,
    width: 30,
    marginLeft: 12,
    zIndex: 9,
    color: '#fff',
    backgroundColor: 'rgba(100, 100, 100, 0.1)',
    borderRadius: 15,
    paddingLeft: 3,

  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',

  },
  follow: {
    margin: 10,
    borderWidth: 1,
    borderColor: '#1DA1F2',
    width: '45%',
    height: 30,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: 'bold',
    backgroundColor: '#fff',
    marginRight: 5,
  },
  headerContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(29, 161, 242, 0.0)',
    //backgroundColor: 'rgba(55, 55, 55, 0.5)',
    height: 50,
    //justifyContent: 'center',
    zIndex: 10,
    paddingTop: 10,
  },
  fackTabContainer: {
    flexDirection: 'row',
  },
  fackTab: {
    width: '50%',
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
  menuImage: {
    width: '100%',
    height: '100%',
  },
  menu: {
    height: 30,
    width: 30,
    borderRadius: 20,
    backgroundColor: 'rgba(100, 100, 100, 0.1)',
    marginRight: 10,
  },
  menuItems: {
    height: 40,
    justifyContent: 'center',
    paddingLeft: 10,
    zIndex: 30,
  },
  itemssContainer: {
    width: '40%',
    backgroundColor: '#fff',
    // borderColor: '#AAB8C2',
    // borderWidth: 1,
    marginLeft: '55%',
    zIndex: 20,
  },
  menuText: {
    color: '#000'
  },
  Container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },

});
