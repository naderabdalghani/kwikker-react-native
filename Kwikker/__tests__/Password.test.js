import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer'; // Note: test renderer must be required after react-native.
import { shallow } from 'enzyme';
import mockAxios from 'axios';
import { mockAsyncStorage, AsyncStorage } from '@react-native-community/async-storage';
import Password from '../App/Screens/Password/Password';


describe('Email component', () => {
  it("updatePasswordButtonPress: update user's Password and go back to account settings", () => {
    const wrapper = shallow(<Password />);
    const instance = wrapper.instance();
    instance.updatePasswordButtonPress();
    if (instance.state.disable) {
      expect(instance.state.error).toBe("passwords don't match or empty");
    } else {
      expect(instance.state.disable).toBe(false);
      expect(mockAxios.put).toHaveBeenCalledTimes(1);
      expect(mockAxios.put).toHaveBeenCalledWith('user/password', {
        password: instance.state.New
      });
    }
  });
});