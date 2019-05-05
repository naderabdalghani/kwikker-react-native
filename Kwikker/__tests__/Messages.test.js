import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer'; // Note: test renderer must be required after react-native.
import { shallow } from 'enzyme';
import mockAxios from 'axios';
import mockAsyncStorage from '@react-native-community/async-storage';
import Messages from '../App/Screens/Messages/Messages';

describe('Messages component', () => {
  it('Mount:  get 20 Conversations on component Mount ', async () => {
    const navigationMock = { addListener: jest.fn(), setParams: jest.fn() };
    const wrapper = shallow(<Messages

      navigation={navigationMock}
    />);
    const Instance = wrapper.instance();
    expect(mockAsyncStorage.getItem).toHaveBeenCalledTimes(2);
    expect(mockAsyncStorage.getItem).toHaveBeenCalledWith('@app:image');
    expect(mockAsyncStorage.getItem).toHaveBeenCalledWith('@app:id');
    expect(mockAxios.get).toHaveBeenCalledTimes(1);
  });
});