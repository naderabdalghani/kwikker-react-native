import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer'; // Note: test renderer must be required after react-native.
import { shallow } from 'enzyme';
import mockAxios from 'axios';
import EditProfile from '../App/Screens/EditProfile/EditProfile';

describe('EditProfile component', () => {
  it('Mount: component Mount ', async () => {
    const navigationMock = { addListener: jest.fn(),
      state: { params: {
        userName: 'this.state.profileData.username',
        cover: 'this.state.profileData.profile_banner_url',
        image: 'this.state.profileData.profile_image_url',
        bio: 'this.state.profileData.bio',
        birthDate: 'this.state.profileData.birth_date',
        screenName: 'this.state.profileData.screen_name', } } };
    const wrapper = shallow(<EditProfile

      navigation={navigationMock}
    />);
    const Instance = wrapper.instance();
    Instance.deleteProfilePhoto();
    expect(mockAxios.delete).toHaveBeenCalledTimes(1);
    Instance.deleteCoverPhoto();
    expect(mockAxios.delete).toHaveBeenCalledTimes(2);
  });
});