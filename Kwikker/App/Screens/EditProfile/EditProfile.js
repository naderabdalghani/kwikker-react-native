import React from 'react';
import { Text, View, ScrollView, Image, TouchableNativeFeedback, TouchableOpacity, ImageBackground, ToastAndroid } from 'react-native';
import axios from 'axios';
import ImagePicker from 'react-native-image-picker';
import CustomTextInput from '../../Components/CustomTextInput/CustomTextInput';
import styles from './Styles';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { currentProfile: '', currentCover: '', Location: '', Web: '', BirthOfDate: '', profileImage: '', coverImage: '', screenName: '', bio: '', photoProfile: null, photoCover: null };
  }

  componentDidMount() {
    this.setState({
      profileImage: this.props.navigation.state.params.image,
      currentProfile: this.props.navigation.state.params.image,
      currentCover: this.props.navigation.state.params.cover,
      coverImage: this.props.navigation.state.params.cover,
      bio: this.props.navigation.state.params.bio,
      birthDate: this.props.navigation.state.params.birthDate,
      screenName: this.props.navigation.state.params.screenName,
    });
  }

  handleChoosePhoto = () => {
    const options = {
      noData: true,
    };
    ImagePicker.launchImageLibrary(options, (response) => {
      if (response.uri) {
        this.setState({ coverImage: response.uri, photoCover: response });
      }
    });
  };

  handleChooseProfile = () => {
    const options = {
      noData: true,
    };
    ImagePicker.launchImageLibrary(options, (response) => {
      if (response.uri) {
        this.setState({ profileImage: response.uri, photoProfile: response });
      }
    });
  };

  updateProfilePic() {
    const formData = new FormData();
    formData.append('file', { name: this.state.photoProfile.fileName, type: this.state.photoProfile.type, uri: this.state.photoProfile.uri });
    axios({
      method: 'post',
      url: 'user/profile_picture',
      data: formData,
      config: { headers: { 'Content-Type': 'multipart/form-data' } }
    })
      .then((response) => {
      })
      .catch(() => {
      })
      .then((response) => {
        this.props.navigation.goBack(null);
      });
  }

  updateCoverPic() {
    const formdata = new FormData();
    formdata.append('file', { name: this.state.photoCover.fileName, type: this.state.photoCover.type, uri: this.state.photoCover.uri });
    axios({
      method: 'post',
      url: 'user/profile_banner',
      data: formdata,
      config: { headers: { 'Content-Type': 'multipart/form-data' } }
    })
      .then((response) => {
      })
      .catch(() => {
      })
      .then((response) => {
        this.updateProfilePic();
      });
  }

  save() {
    axios.patch('user/profile', {
      bio: this.state.bio,
      screen_name: this.state.screenName,
    })
      .then((response) => {
        // ToastAndroid.show(this.state.message, ToastAndroid.SHORT);
      })
      .catch((error) => {
        // ToastAndroid.show(this.state.message, ToastAndroid.SHORT);
      })
      .then((response) => {
        if (!(this.state.currentCover === this.state.coverImage)) {
          const formdata = new FormData();
          formdata.append('file', { name: this.state.photoCover.fileName, type: this.state.photoCover.type, uri: this.state.photoCover.uri });
          axios({
            method: 'post',
            url: 'user/profile_banner',
            data: formdata,
            config: { headers: { 'Content-Type': 'multipart/form-data' } }
          })
            .then((response) => {
            })
            .catch(() => {
            })
            .then((response) => {
              if (!(this.state.currentProfile === this.state.profileImage)) {
                const formData = new FormData();
                formData.append('file', { name: this.state.photoProfile.fileName, type: this.state.photoProfile.type, uri: this.state.photoProfile.uri });
                axios({
                  method: 'post',
                  url: 'user/profile_picture',
                  data: formData,
                  config: { headers: { 'Content-Type': 'multipart/form-data' } }
                })
                  .then((response) => {
                    this.props.navigation.goBack(null);
                  })
                  .catch(() => {
                    this.props.navigation.goBack(null);
                  })
                  .then((response) => {
                    this.props.navigation.goBack(null);
                  });
              }
            });
        }
        else if (!(this.state.currentProfile === this.state.profileImage)) {
          const formData = new FormData();
          formData.append('file', { name: this.state.photoProfile.fileName, type: this.state.photoProfile.type, uri: this.state.photoProfile.uri });
          axios({
            method: 'post',
            url: 'user/profile_picture',
            data: formData,
            config: { headers: { 'Content-Type': 'multipart/form-data' } }
          })
            .then((response) => {
            })
            .catch(() => {
            })
            .then((response) => {
              if (!(this.state.currentCover === this.state.coverImage)) {
                const formdata = new FormData();
                formdata.append('file', { name: this.state.photoCover.fileName, type: this.state.photoCover.type, uri: this.state.photoCover.uri });
                axios({
                  method: 'post',
                  url: 'user/profile_banner',
                  data: formdata,
                  config: { headers: { 'Content-Type': 'multipart/form-data' } }
                })
                  .then((response) => {
                    this.props.navigation.goBack(null);
                  })
                  .catch(() => {
                    this.props.navigation.goBack(null);
                  })
                  .then((response) => {
                    this.props.navigation.goBack(null);
                  });
                }
            });
        }
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
            <Text style={styles.save}>SAVE</Text>
          </TouchableOpacity>
        </View>


        <ScrollView style={{ flex: 1 }}>
          <ImageBackground
            style={styles.Cover}
            source={{ uri: this.state.coverImage }}
          >
            <View style={styles.bgOverlay}>
              <TouchableOpacity onPress={this.handleChoosePhoto} style={styles.camraCon}>
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
                <View style={styles.profileOverlay}>
                  <TouchableOpacity onPress={this.handleChooseProfile} style={styles.camraMiniCon}>
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
