import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer'; // Note: test renderer must be required after react-native.
import { shallow } from 'enzyme';
import mockAxios from 'axios';
import mockAsyncStorage from '@react-native-community/async-storage';
import MutedAccount from '../App/Components/MutedAccount/MutedAccount';


describe('MutedAccount component', () => {
  it('unMute: unmute user', () => {
    const navigationMock = { addListener: jest.fn(), goBack: jest.fn(), };
    const wrapper = shallow(<MutedAccount navigation={navigationMock} />);
    const instance = wrapper.instance();
    instance.unMute();
    expect(mockAxios.delete).toHaveBeenCalledTimes(1);
  });
});