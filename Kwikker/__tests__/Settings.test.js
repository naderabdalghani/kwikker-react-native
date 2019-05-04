import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer'; // Note: test renderer must be required after react-native.
import { shallow } from 'enzyme';
import mockAxios from 'axios';
import mockAsyncStorage from '@react-native-community/async-storage';
import Settings from '../App/Screens/Settings/Settings';


describe('Settings component', () => {
  it('Account: should navigate the "Account" screen', () => {
    const navigationMock = { navigate: jest.fn(), addListener: jest.fn() };
    const wrapper = shallow(<Settings navigation={navigationMock} />);
    wrapper.instance().Account();
    expect(navigationMock.navigate).toHaveBeenCalledWith('Account');
  });
  it('PrivacyAndSafety: should navigate the "PrivacyAndSafety" screen', () => {
    const navigationMock = { navigate: jest.fn(), addListener: jest.fn() };
    const wrapper = shallow(<Settings navigation={navigationMock} />);
    wrapper.instance().PrivacyAndSafety();
    expect(navigationMock.navigate).toHaveBeenCalledWith('PrivacyAndSafety');
  });
});