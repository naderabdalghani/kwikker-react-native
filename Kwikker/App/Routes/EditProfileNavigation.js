import React, { Component } from 'react';
import EditProfile from './../Screens/EditProfile/EditProfile';
import { createStackNavigator, CreateAppContainer } from 'react-navigation'

const EditProfileNavigator = createStackNavigator({

    EditProfile: { screen: EditProfile,
        navigationOptions: {
            title: 'EditProfile',
        } 
    }
});
export default EditProfileNavigator