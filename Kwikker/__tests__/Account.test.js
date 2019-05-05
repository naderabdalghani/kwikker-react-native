import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer'; // Note: test renderer must be required after react-native.
import { shallow } from 'enzyme';
import mockAxios from 'axios';
import mockAsyncStorage from '@react-native-community/async-storage';
import Account from '../App/Screens/Account/Account';


describe('Account component', () => {
  it('Username: should push the "Username" screen', () => {
    const navigationMock = { push: jest.fn(), addListener: jest.fn(), navigate: jest.fn() };
    const wrapper = shallow(<Account navigation={navigationMock} />);
    wrapper.instance().Username();
    expect(navigationMock.navigate).toHaveBeenCalledWith('Username');
  });
  it('Email: should push the "Email" screen', () => {
    const navigationMock = { push: jest.fn(), addListener: jest.fn(), navigate: jest.fn() };
    const wrapper = shallow(<Account navigation={navigationMock} />);
    wrapper.instance().Email();
    expect(navigationMock.navigate).toHaveBeenCalledWith('Email');
  });
  it('Password: should push the "UsPasswordername" screen', () => {
    const navigationMock = { push: jest.fn(), addListener: jest.fn(), navigate: jest.fn() };
    const wrapper = shallow(<Account navigation={navigationMock} />);
    wrapper.instance().Password();
    expect(navigationMock.navigate).toHaveBeenCalledWith('Password');
  });
});