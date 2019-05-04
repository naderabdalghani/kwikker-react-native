import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer'; // Note: test renderer must be required after react-native.
import { shallow } from 'enzyme';
import mockAxios from 'axios';
import mockAsyncStorage from '@react-native-community/async-storage';
import Login from '../App/Screens/Login/Login';

describe('Login component', () => {
  it('onLoginFail: should set the error message to "Authentication Failed" and turn off the loading screen', () => {
    const wrapper = shallow(<Login />);
    const instance = wrapper.instance();
    instance.onLoginFail();
    expect(wrapper.instance().state.message).toBe('Authentication Failed');
    expect(wrapper.instance().state.loading).toBe(false);
  });
  it('onLoginSuccess: should set default header common access token, then, navigate to "Home" screen', () => {
    const navigationMock = { navigate: jest.fn() };
    const wrapper = shallow(<Login navigation={navigationMock} />);
    wrapper.instance().onLoginSuccess();
    expect(mockAsyncStorage.getItem).toHaveBeenCalledTimes(1);
    expect(mockAsyncStorage.getItem).toHaveBeenCalledWith('@app:session');
  });
  it('signUp: should push the "Signup" screen', () => {
    const navigationMock = { push: jest.fn() };
    const wrapper = shallow(<Login navigation={navigationMock} />);
    wrapper.instance().signUp();
    expect(navigationMock.push).toHaveBeenCalledWith('Signup');
  });
  it('logInButtonPress: should turn on the loading screen, clear the error message, process the user\'s credentials ', async () => {
    const wrapper = shallow(<Login />);
    const instance = wrapper.instance();
    const logInButtonPressInstance = await instance.logInButtonPress();
    expect(wrapper.instance().state.loading).toBe(true);
    expect(wrapper.instance().state.message).toBe('');
    expect(mockAxios.post).toHaveBeenCalledTimes(1);
    expect(mockAxios.post).toHaveBeenCalledWith('account/login', {
      username: instance.state.username,
      password: instance.state.password
    });
  });
  it('forgotPassword: should push the "forgotPassword" screen', () => {
    const navigationMock = { push: jest.fn() };
    const wrapper = shallow(<Login navigation={navigationMock} />);
    wrapper.instance().forgotPassword();
    expect(navigationMock.push).toHaveBeenCalledWith('ForgotPassword');
  });
});