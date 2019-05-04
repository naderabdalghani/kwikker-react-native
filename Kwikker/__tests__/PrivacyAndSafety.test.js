import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer'; // Note: test renderer must be required after react-native.
import { shallow } from 'enzyme';
import mockAxios from 'axios';
import mockAsyncStorage from '@react-native-community/async-storage';
import PrivacyAndSafety from '../App/Screens/PrivacyAndSafety/PrivacyAndSafety';


describe('PrivacyAndSafety component', () => {
  it('BlockedAccounts: should navigate the "BlockedAccounts" screen', () => {
    const navigationMock = { navigate: jest.fn(), addListener: jest.fn() };
    const wrapper = shallow(<PrivacyAndSafety navigation={navigationMock} />);
    wrapper.instance().BlockedAccounts();
    expect(navigationMock.navigate).toHaveBeenCalledWith('BlockedAccounts');
  });
  it('MutedAccounts: should navigate the "MutedAccounts" screen', () => {
    const navigationMock = { navigate: jest.fn(), addListener: jest.fn() };
    const wrapper = shallow(<PrivacyAndSafety navigation={navigationMock} />);
    wrapper.instance().MutedAccounts();
    expect(navigationMock.navigate).toHaveBeenCalledWith('MutedAccounts');
  });
});