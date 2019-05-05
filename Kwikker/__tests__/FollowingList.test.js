import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer'; // Note: test renderer must be required after react-native.
import { shallow } from 'enzyme';
import mockAxios from 'axios';
import { mockAsyncStorage, AsyncStorage } from '@react-native-community/async-storage';
import FollowingList from '../App/Screens/FollowingList/FollowingList';


describe('FollowingList component', () => {
  it('render list', () => {
    const wrapper = shallow(<FollowingList
      navigation={
        { addListener: jest.fn(),
          state: { params: {
            userName: 'username', } } }
      }
    />);
    const instance = wrapper.instance();
    expect(mockAxios.get).toHaveBeenCalledTimes(1);
  });
});