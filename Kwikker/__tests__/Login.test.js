import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer'; // Note: test renderer must be required after react-native.
import { shallow } from 'enzyme';
import Login from '../App/Screens/Login/Login';

describe('Login component', () => {
  it('onLoginFail: should set the error message to "Authentication Failed" and turn off the loading screen', () => {
    const wrapper = shallow(<Login />);
    const instance = wrapper.instance();
    instance.onLoginFail();
    expect(wrapper.instance().state.error).toBe('Authentication Failed');
    expect(wrapper.instance().state.loading).toBe(false);
  });
  it('onLoginSuccess: should set default header common access token, then, navigate to "Home" screen', () => {
    // TO-DO
  });
  it('signUp: should push the "Signup" screen', () => {
    const navigationMock = { push: jest.fn() };
    const wrapper = shallow(<Login navigation={navigationMock} />);
    wrapper.instance().signUp();
    expect(navigationMock.push).toHaveBeenCalledWith('Signup');
  });
  it('logInButtonPress: should turn on the loading screen, clear the error message, process the user\'s credentials ', () => {
    const wrapper = shallow(<Login />);
    const instance = wrapper.instance();
    instance.logInButtonPress();
    expect(wrapper.instance().state.loading).toBe(true);
    expect(wrapper.instance().state.error).toBe('');
    // TO-DO
  });
  it('forgotPassword: should push the "forgotPassword" screen', () => {
    const navigationMock = { push: jest.fn() };
    const wrapper = shallow(<Login navigation={navigationMock} />);
    wrapper.instance().forgotPassword();
    expect(navigationMock.push).toHaveBeenCalledWith('ForgotPassword');
  });
});