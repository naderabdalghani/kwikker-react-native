import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer'; // Note: test renderer must be required after react-native.
import { shallow } from 'enzyme';
import mockAxios from 'axios';
import mockAsyncStorage from '@react-native-community/async-storage';
import BlockedAccounts from '../App/Screens/BlockedAccounts/BlockedAccounts';

describe('BlockedAccounts component', () => {
  it('block: gets list of blocked users', () => {
    const navigationMock = { addListener: jest.fn(), goBack: jest.fn(), };
    const wrapper = shallow(<BlockedAccounts navigation={navigationMock} />);
    const instance = wrapper.instance();
    instance.block();
    expect(mockAxios.get).toHaveBeenCalledTimes(1);
    instance.muted();
    expect(mockAxios.get).toHaveBeenCalledTimes(2);
  });
});