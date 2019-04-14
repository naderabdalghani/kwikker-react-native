import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer'; // Note: test renderer must be required after react-native.
import { shallow } from 'enzyme';
import mockAxios from 'axios';
import { mockAsyncStorage, AsyncStorage } from '@react-native-community/async-storage';
import Email from '../App/Screens/Email/Email';


describe('Email component', () => {
  it("nextButtonPress: update user's Email and go back to account settings", () => {
    const wrapper = shallow(<Email />);
    const instance = wrapper.instance();
    instance.nextButtonPress();
    expect(mockAxios.put).toHaveBeenCalledTimes(1);
    expect(mockAxios.put).toHaveBeenCalledWith('user/email', {
      email: instance.state.Name
    });
  });
});