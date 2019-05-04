import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer'; // Note: test renderer must be required after react-native.
import { shallow } from 'enzyme';
import mockAxios from 'axios';
import { mockAsyncStorage, AsyncStorage } from '@react-native-community/async-storage';
import Password from '../App/Screens/Password/Password';


describe('Email component', () => {
  it("updatePasswordButtonPress: update user's Password and go back to account settings", () => {
    const navigationMock = { addListener: jest.fn(), setParams: jest.fn(), getParam: jest.fn() };
    const wrapper = shallow(<Password
      navigation={navigationMock}
    />);
    const instance = wrapper.instance();
    instance.updatePasswordButtonPress();
    expect(mockAxios.put).toHaveBeenCalledTimes(0);
  });
});