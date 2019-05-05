import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer'; // Note: test renderer must be required after react-native.
import { shallow } from 'enzyme';
import mockAxios from 'axios';
import mockAsyncStorage from '@react-native-community/async-storage';
import SearchBar from '../App/Screens/SearchBar/SearchBar';

describe('SearchBar component', () => {
  it('Mount:  get 20 kweeks of a trend on component Mount ', async () => {
    const navigationMock = { addListener: jest.fn(),
      setParams: jest.fn(),
      navigate: jest.fn(),
      state: { params: { search: 'trend', trendID: 0 } } };
    const wrapper = shallow(<SearchBar

      navigation={navigationMock}
    />);
    const Instance = wrapper.instance();
    expect(mockAxios.get).toHaveBeenCalledTimes(1);
  });
  it('Mount:  get 20 kweeks/user search component Mount ', async () => {
    const navigationMock = { addListener: jest.fn(),
      setParams: jest.fn(),
      navigate: jest.fn(),
      state: { params: { search: '' } } };
    const wrapper = shallow(<SearchBar

      navigation={navigationMock}
    />);
    const Instance = wrapper.instance();
    expect(mockAxios.get).toHaveBeenCalledTimes(3);
  });
});