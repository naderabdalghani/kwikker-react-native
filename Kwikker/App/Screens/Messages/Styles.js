import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  messageButton: {
    // Here is the trick
    position: 'absolute',
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'flex-end',
    right: 30,
    bottom: 30,
  },
  buttomImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'flex-end',
  }
});