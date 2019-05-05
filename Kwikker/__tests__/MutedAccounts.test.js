import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer'; // Note: test renderer must be required after react-native.
import { shallow } from 'enzyme';
import mockAxios from 'axios';
import mockAsyncStorage from '@react-native-community/async-storage';
import MutedAccounts from '../App/Screens/MutedAccounts/MutedAccounts';

describe('mutedAccounts component', () => {
  it('muted: gets list of muted users', () => {
    const navigationMock = { addListener: jest.fn(), goBack: jest.fn(), };
    const wrapper = shallow(<MutedAccounts navigation={navigationMock} />);
    const instance = wrapper.instance();
    expect(mockAxios.get).toHaveBeenCalledTimes(1);
    instance.muted();
    expect(mockAxios.get).toHaveBeenCalledTimes(2);
  });
});