import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer'; // Note: test renderer must be required after react-native.
import { shallow } from 'enzyme';
import mockAxios from 'axios';
import { mockAsyncStorage, AsyncStorage } from '@react-native-community/async-storage';
import Profile from '../App/Screens/Profile/Profile';


describe('Profile component', () => {
  it('render Profile', () => {
    const wrapper = shallow(<Profile
      navigation={
        { addListener: jest.fn(),
          state: { params: {
            username: 'username', } } }
      }
    />);
    const instance = wrapper.instance();
    instance.pullRefresh();
    expect(mockAxios.get).toHaveBeenCalledTimes(3);
  });
});