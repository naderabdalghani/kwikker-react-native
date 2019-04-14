import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer'; // Note: test renderer must be required after react-native.
import { shallow } from 'enzyme';
import mockAxios from 'axios';
import mockAsyncStorage from '@react-native-community/async-storage';
import DrawerNavContainer from '../App/Screens/DrawerNavContainer/DrawerNavContainer';

describe('SignOut component', () => {
  it('logoutButtonPressed: should delete the access token and username then redirect the user to the start screen', () => {
    const navigationMock = { navigate: jest.fn() };
    const wrapper = shallow(<DrawerNavContainer navigation={navigationMock} />);
    const instance = wrapper.instance();
    instance.logoutButtonPressed();
    expect(mockAsyncStorage.multiRemove).toHaveBeenCalledTimes(1);
    expect(mockAsyncStorage.multiRemove).toHaveBeenCalledWith(['@app:session', '@app:id']);
    expect(mockAxios.defaults.headers.common.TOKEN).toBe('');
    expect(navigationMock.navigate).toHaveBeenCalledWith('StartScreen');
  });
});