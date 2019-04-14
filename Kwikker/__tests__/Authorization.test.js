import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer'; // Note: test renderer must be required after react-native.
import mockAxios from 'axios';
import mockAsyncStorage from '@react-native-community/async-storage';
import auth from '../App/Utils/Authorization';

test('should check whether the user whose username is entered as a paramter is the same as the user logged in the application', () => {
  const mockAuth = jest.fn().mockImplementation(auth);
  mockAuth();
  expect(mockAuth).toHaveBeenCalled();
  expect(mockAuth).toHaveReturned();
  mockAuth('test');
  expect(mockAuth).toHaveBeenCalled();
  expect(mockAuth).toHaveBeenCalledWith('test');
});
