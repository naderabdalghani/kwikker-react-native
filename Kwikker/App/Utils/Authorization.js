import AsyncStorage from '@react-native-community/async-storage';

/**
 * Checks whether the user whose username is entered as a paramter is the same as the user logged in the application
 * @param {string} username - Username of a user
 * @returns {int} 1 if the entered username belongs to the logged in user, otherwise it returns 0
 */
export function auth(username) {
  AsyncStorage.getItem('@app:id').then((id) => {
    if (id === username) {
      return 1;
    }
    return 0;
  });
}