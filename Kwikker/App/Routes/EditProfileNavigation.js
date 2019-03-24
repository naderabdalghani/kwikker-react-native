import React, { Component } from 'react';
import { createStackNavigator, CreateAppContainer } from 'react-navigation';
import EditProfile from '../Screens/EditProfile/EditProfile';

const EditProfileNavigator = createStackNavigator({

  EditProfile: { screen: EditProfile,
    navigationOptions: {
      title: 'EditProfile',
    }
  }
});
export default EditProfileNavigator;