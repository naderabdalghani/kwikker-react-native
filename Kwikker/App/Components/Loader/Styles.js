import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  modalBackground: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: '#00000090'
  },
  activityIndicatorWrapper: {
    backgroundColor: '#FFFFFF',
    height: '12.5%',
    width: '55%',
    borderRadius: 2,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
    flexDirection: 'row',
  },
  loadingText: {
    color: '#000',
    flex: 1.5,
  },
  activityIndicatorStyle: {
    flex: 1,
  },
});
