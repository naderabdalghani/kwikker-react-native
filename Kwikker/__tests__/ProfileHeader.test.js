import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer'; // Note: test renderer must be required after react-native.
import { shallow } from 'enzyme';
import mockAxios from 'axios';
import mockAsyncStorage from '@react-native-community/async-storage';
import ProfileHeader from '../App/Components/ProfileHeader/ProfileHeader';

describe('Profile Header component', () => {
  it('Profile Header', () => {
    const wrapper = shallow(<ProfileHeader
      Follower={jest.fn()}
      Following={jest.fn()}
      EditProfile={jest.fn()}
      updateProfile={jest.fn()}
      conversation={jest.fn()}
      ref={(ref) => { this.feedback = ref; }}
      followingCount={0}
      followersCount={0}
      username="name"
      bio="bio"
      birthDate="day"
      createdAt="at"
      profileBannerUrl=""
      profileImageUrl=""
      screenName="hi"
      following
      blocked={false}
      muted
      followsYou
      myProfile={false}
      uBlocked={false}
      blockedView={false}
    />);
    const instance = wrapper.instance();
    instance.follow();
    expect(mockAxios.post).toHaveBeenCalledTimes(1);
    instance.unfollow();
    expect(mockAxios.delete).toHaveBeenCalledTimes(1);
    instance.unblock();
    expect(mockAxios.delete).toHaveBeenCalledTimes(2);
  });
});