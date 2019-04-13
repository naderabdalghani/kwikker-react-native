import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer'; // Note: test renderer must be required after react-native.
import mockAxios from 'axios';
import mockAsyncStorage from '@react-native-community/async-storage';
import auth from '../App/Utils/Authorization';

test('should check whether the user whose username is entered as a paramter is the same as the user logged in the application', () => {
  auth = jest.fn();
  expect(auth).toHaveReturned();
  expect(mockAsyncStorage.getItem).toHaveBeenCalledTimes(1);
  expect(mockAsyncStorage.multiRemove).toHaveBeenCalledWith('@app:id');
});