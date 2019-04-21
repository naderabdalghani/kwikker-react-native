import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer'; // Note: test renderer must be required after react-native.
import { shallow } from 'enzyme';
import mockAxios from 'axios';
import StartScreen from '../App/Screens/StartScreen/StartScreen';

describe('StartScreen component', () => {
  it('signUp: should push the "Signup" screen', () => {
    const navigationMock = { push: jest.fn() };
    const wrapper = shallow(<StartScreen navigation={navigationMock} />);
    wrapper.instance().signUp();
    expect(navigationMock.push).toHaveBeenCalledWith('Signup');
  });
  it('logIn: should push the "Login" screen', () => {
    const navigationMock = { push: jest.fn() };
    const wrapper = shallow(<StartScreen navigation={navigationMock} />);
    wrapper.instance().logIn();
    expect(navigationMock.push).toHaveBeenCalledWith('Login');
  });
  it('confirmUser: should confirm the user who has clicked on a confirmation link. Displays a success message if the confirmation was successful, otherwise, it displays an error message', async () => {
    const navigationMock = { push: jest.fn() };
    const wrapper = shallow(<StartScreen navigation={navigationMock} />);
    const url = 'http://kwikker.me/confirm/1234';
    const instance = wrapper.instance();
    const confirmUser = await instance.confirmUser(url);
    expect(mockAxios.post).toHaveBeenCalledWith('account/registration/confirmation', {}, {
      headers: {
        CODE: 1234
      }
    });
    expect(navigationMock.push).toHaveBeenCalledWith('Login');
    expect(instance.state.loading).toBe(false);
  });
  it('resetPassword: should specify temporary header config defaults then redirects the user to the \'Update password\' form', async () => {
    const navigationMock = { navigate: jest.fn() };
    const wrapper = shallow(<StartScreen navigation={navigationMock} />);
    const url = 'http://kwikker.me/reset_password/1234';
    const instance = wrapper.instance();
    const resetPassword = await instance.resetPassword(url);
    expect(instance.state.loading).toBe(true);
    expect(navigationMock.navigate).toHaveBeenCalledWith('Password', { forgotPassword: true, resetCode: '1234' });
  });
  it('handleOpenURL: should handle opening a kwikker URL in iOS', () => {
    const wrapper = shallow(<StartScreen />);
    const event = {
      url: 'http://kwikker.me/reset_password/1234'
    };
    wrapper.instance().confirmUser = jest.fn();
    wrapper.update();
    wrapper.instance().handleOpenURL(event);
    expect(wrapper.instance().confirmUser).toHaveBeenCalledWith(event.url);
  });
});