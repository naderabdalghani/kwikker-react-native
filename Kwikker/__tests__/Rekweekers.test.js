import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer'; // Note: test renderer must be required after react-native.
import { shallow } from 'enzyme';
import mockAxios from 'axios';
import { mockAsyncStorage, AsyncStorage } from '@react-native-community/async-storage';
import RekweekersList from '../App/Screens/Rekweekers/Rekweekers';


describe('Likers component', () => {
  it('get list of rekweekers of a certain kweek', () => {
    const navigationMock = { addListener: jest.fn(), setParams: jest.fn(), getParam: jest.fn(), state: { params: { kweekId: 'kweekId' } } };
    const wrapper = shallow(<RekweekersList
      navigation={navigationMock}
    />);
    const instance = wrapper.instance();
    expect(mockAxios.put).toHaveBeenCalledTimes(0);
    expect(instance.state.refreshing).toBe(true);
    instance.pullRefresh();
    expect(instance.state.refreshing).toBe(true);
  });
});