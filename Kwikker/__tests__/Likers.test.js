import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer'; // Note: test renderer must be required after react-native.
import { shallow } from 'enzyme';
import mockAxios from 'axios';
import { mockAsyncStorage, AsyncStorage } from '@react-native-community/async-storage';
import Likers from '../App/Screens/Likers/Likers';


describe('LikersList component', () => {
  it('render list', () => {
    const navigationMock = { addListener: jest.fn(),
      setParams: jest.fn(),
      navigate: jest.fn(),
      params: { kweekId: '500' } };
    const wrapper = shallow(<Likers

      navigation={navigationMock}
    />);
    const instance = wrapper.instance();
    expect(mockAxios.get).toHaveBeenCalledTimes(1);
  });
});