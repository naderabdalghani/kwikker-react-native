import AsyncStorage from '@react-native-community/async-storage';

export function auth(username) {
  AsyncStorage.getItem('@app:id').then((id) => {
    if (id === username) {
      return true;
    }
    return false;
  });
}