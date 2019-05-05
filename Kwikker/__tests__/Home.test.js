import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer'; // Note: test renderer must be required after react-native.
import { shallow } from 'enzyme';
import mockAxios from 'axios';
import { Home } from '../App/Screens/Home/Home';

describe('homeComponent component', () => {
  it('Mount:  get 20 kweeks on component Mount ', async () => {
    const navigationMock = { addListener: jest.fn() };
    const wrapper = shallow(<Home navigation={navigationMock} />);
    const Instance = wrapper.instance();
    expect(wrapper.instance().state.refreshing).toBe(true);
    expect(mockAxios.get).toHaveBeenCalledTimes(1);
    expect(mockAxios.get).toHaveBeenCalledWith('kweeks/timelines/home', {
      params: {
        last_retrieved_kweek_id: null,
        last_retrieved_rekweeker_username: null
      }
    });
    const pullInstance = await Instance.pullRefresh();
    expect(wrapper.instance().state.refreshing).toBe(true);
    expect(mockAxios.get).toHaveBeenCalledTimes(3);
    expect(mockAxios.get).toHaveBeenCalledWith('kweeks/timelines/home', {
      params: {
        last_retrieved_kweek_id: null,
        last_retrieved_rekweeker_username: null
      }
    });
    const updateInstance = await Instance.updateKweeks(5);
    expect(wrapper.instance().state.refreshing).toBe(true);
    expect(mockAxios.get).toHaveBeenCalledTimes(4);
    expect(mockAxios.get).toHaveBeenCalledWith('kweeks/timelines/home', {
      params: {
        last_retrieved_kweek_id: 5,
        last_retrieved_rekweeker_username: null

      }
    });
  });
});