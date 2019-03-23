import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer'; // Note: test renderer must be required after react-native.
import { shallow } from 'enzyme';
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
});