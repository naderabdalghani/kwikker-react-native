import React from 'react';
import { Text, View, ScrollView, Image, TouchableNativeFeedback, TouchableOpacity, ImageBackground } from 'react-native';
import axios from 'axios';
import CustomTextInput from '../../Components/CustomTextInput/CustomTextInput';
import styles from './Styles';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { Name: '', Bio: '', Location: '', Web: '', BirthOfDate: '', profileImage: '', coverImage: '', screenName: '', bio: '', date: '' };
  }

  componentDidMount() {
    this.setState({
      profileImage: this.props.navigation.state.params.image,
      coverImage: this.props.navigation.state.params.cover,
      bio: this.props.navigation.state.params.bio,
      birthDate: this.props.navigation.state.params.birthDate,
      screenName: this.props.navigation.state.params.screenName,
    });
  }

  save() {
    axios.patch('user/profile', {
      bio: this.state.bio,
      screen_name: this.state.screenName,
    })
      .then((response) => {
        // ToastAndroid.show(this.state.message, ToastAndroid.SHORT);
        this.props.navigation.goBack(null);
      })
      .catch((error) => {
        // ToastAndroid.show(this.state.message, ToastAndroid.SHORT);
        this.props.navigation.goBack(null);
      });
  }

  render() {
    return (

      <View style={{ flex: 1 }}>
        <View style={styles.header}>
          <View style={styles.backButtonContainer}>
            <TouchableNativeFeedback onPress={() => this.props.navigation.goBack(null)}>
              <Image
                style={styles.backButton}
                source={require('./../../Assets/Images/back_button.png')}
              />
            </TouchableNativeFeedback>
          </View>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Edit profile</Text>
          </View>
          <TouchableOpacity onPress={() => { this.save(); }}>
            <Text style={{color: '#1DA1F2', fontSize: 15, fontWeight: 'bold', marginTop: 15, marginRight: 10, }}>SAVE</Text>
          </TouchableOpacity>
        </View>

        
        <ScrollView style={{ flex: 1 }}>
          <ImageBackground
            style={styles.Cover}
            source={{ uri: this.state.coverImage }}
          >
            <View style={{height: 120, backgroundColor: 'rgba(100, 100, 100, 0.5)', zIndex: 2, justifyContent: 'center', }}>
              <TouchableOpacity style={{width: 50, height: 50, backgroundColor: 'rgba(200, 200, 200, 0.5)', borderRadius: 25, justifyContent: 'center', alignSelf: 'center', }}>
                <Image
                  style={styles.camera}
                  source={require('./../../Assets/Images/camera.png')}
                />
              </TouchableOpacity>
            </View>
          </ImageBackground>
          <View style={{ flex: 1, flexDirection: 'row' }}>
            <View style={styles.ProfileImageContainer}>
              <ImageBackground
                style={styles.ProfileImage}
                source={{ uri: this.state.profileImage }}
              >
              <View style={{height: 80, backgroundColor: 'rgba(100, 100, 100, 0.5)', zIndex: 2, justifyContent: 'center', }}>
                <TouchableOpacity style={{width: 40, height: 40, backgroundColor: 'rgba(200, 200, 200, 0.5)', borderRadius: 20, justifyContent: 'center', alignSelf: 'center', }}>
                  <Image
                    style={styles.cameraMini}
                    source={require('./../../Assets/Images/camera.png')}
                  />
                </TouchableOpacity>
              </View>
              </ImageBackground>
            </View>
          </View>
          <CustomTextInput
            placeholder=""
            label="Name"
            secureTextEntry={false}
            value={this.state.screenName}
            onChangeText={(screenName) => this.setState({ screenName })}
            autoFocus={false}
          />
          <CustomTextInput
            placeholder=""
            label="Bio"
            secureTextEntry={false}
            value={this.state.bio}
            onChangeText={(bio) => this.setState({ bio })}
            autoFocus={false}
          />
          {/* <CustomTextInput
            placeholder=""
            label="Location"
            secureTextEntry={false}
            value={this.state.Location}
            onChangeText={(Location) => this.setState({ Location })}
            autoFocus={false}
          />
          <CustomTextInput
            placeholder=""
            label="Website"
            secureTextEntry={false}
            value={this.state.Web}
            onChangeText={(Web) => this.setState({ Web })}
            autoFocus={false}
          />
          <View style={styles.dateContainer}>
            <Text style={styles.dateText}>Birth date</Text>
            <View style={styles.datePickerContainer}>
              <DatePicker
                locale="en"
                timeZoneOffsetInMinutes={undefined}
                modalTransparent={false}
                animationType="fade"
                androidMode="default"
                placeHolderText=""
                textStyle={styles.datePickerText}
                placeHolderTextStyle={styles.datePickerPlaceholder}
                onDateChange={(date) => this.setState({ date })}
                disabled={false}
              />
            </View>
          </View> */}
        </ScrollView>
      </View>
    );
  }
}
