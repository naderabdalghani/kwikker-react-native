import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer'; // Note: test renderer must be required after react-native.
import { shallow } from 'enzyme';
import mockAxios from 'axios';
import mockAsyncStorage from '@react-native-community/async-storage';
import Search from '../App/Screens/Search/Search';

describe('Search component', () => {
  it('Mount:  get 20 trend on component Mount ', async () => {
    const navigationMock = { addListener: jest.fn(), setParams: jest.fn(), navigate: jest.fn() };
    const wrapper = shallow(<Search

      navigation={navigationMock}
    />);
    const Instance = wrapper.instance();
    expect(mockAxios.get).toHaveBeenCalledTimes(1);
  });
});