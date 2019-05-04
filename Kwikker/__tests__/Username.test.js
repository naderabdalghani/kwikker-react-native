import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer'; // Note: test renderer must be required after react-native.
import { shallow } from 'enzyme';
import mockAxios from 'axios';
import mockAsyncStorage from '@react-native-community/async-storage';
import Username from '../App/Screens/Username/Username';


describe('Username component', () => {
  it("doneButtonPress: update user's username and go back to account settings", () => {
    const navigationMock = { addListener: jest.fn() };
    const wrapper = shallow(<Username navigation={navigationMock} />);
    const instance = wrapper.instance();
    instance.doneButtonPress();
    expect(mockAxios.put).toHaveBeenCalledTimes(1);
    expect(mockAxios.put).toHaveBeenCalledWith('user/username', {
      username: instance.state.Name
    });
  });
});