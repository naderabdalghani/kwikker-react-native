import React from 'react';
import { RefreshControl, Text, View, ScrollView, Image, TouchableNativeFeedback, TouchableOpacity, ImageBackground, ToastAndroid } from 'react-native';
import axios from 'axios';
import ImagePicker from 'react-native-image-picker';
import { ActionSheetCustom as ActionSheet } from 'react-native-actionsheet';
import AsyncStorage from '@react-native-community/async-storage';
import CustomTextInput from '../../Components/CustomTextInput/CustomTextInput';
import styles from './Styles';

/** @module EditProfile **/

export default class EditProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentProfile: '',
      currentCover: '',
      profileImage: '',
      coverImage: '',
      screenName: '',
      bio: '',
      photoProfile: null,
      photoCover: null,
      profile: true,
      refreshing: false,
    };
  }

  componentDidMount() {
    this.setState({
      profileImage: this.props.navigation.state.params.image,
      currentProfile: this.props.navigation.state.params.image,
      currentCover: this.props.navigation.state.params.cover,
      coverImage: this.props.navigation.state.params.cover,
      bio: this.props.navigation.state.params.bio,
      screenName: this.props.navigation.state.params.screenName,
    });
  }

  /** action sheet options.
    * determine options to be shown in update picture menu.
    * @memberof EditProfile
    */
  getOptions() {
    if (this.state.profile) return (['Cancle', 'delete profile photo', 'Choose existing photo']);
    return (['Cancle', 'delete cover photo', 'Choose existing photo']);
  }

  /** pull to refresh functionality.
   * set refreshing to false.
   * @memberof EditProfile
  */
  pullRefresh= () => {
    this.setState({ refreshing: false, });
  }

  /** shoe action sheet.
   * open update picture minu.
   * @memberof EditProfile
  */
  showActionSheet = () => {
    this.ActionSheet.show();
  }

  /** when user choose bunner Photo
 * @memberof EditProfile
 */
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

  /** when user choose profile Photo
 * @memberof EditProfile
 */
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

  // updateProfilePic() {
  //   const formData = new FormData();
  //   formData.append('file', { name: this.state.photoProfile.fileName, type: this.state.photoProfile.type, uri: this.state.photoProfile.uri });
  //   axios({
  //     method: 'post',
  //     url: 'user/profile_picture',
  //     data: formData,
  //     config: { headers: { 'Content-Type': 'multipart/form-data' } }
  //   })
  //     .then((response) => {
  //     })
  //     .catch(() => {
  //     })
  //     .then((response) => {
  //       this.props.navigation.goBack(null);
  //     });
  // }

  // updateCoverPic() {
  //   const formdata = new FormData();
  //   formdata.append('file', { name: this.state.photoCover.fileName, type: this.state.photoCover.type, uri: this.state.photoCover.uri });
  //   axios({
  //     method: 'post',
  //     url: 'user/profile_banner',
  //     data: formdata,
  //     config: { headers: { 'Content-Type': 'multipart/form-data' } }
  //   })
  //     .then((response) => {
  //     })
  //     .catch(() => {
  //     })
  //     .then((response) => {
  //       this.updateProfilePic();
  //     });
  // }

  /** press save button.
   * updates pictures and screen name and bio.
 * @memberof EditProfile
 */
  save() {
    if (!(this.state.refreshing)) {
      this.setState({ refreshing: true });
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
        .then(() => {
          if (!(this.state.currentCover === this.state.coverImage)) {
            const formdata = new FormData();
            formdata.append('file', { name: this.state.photoCover.fileName, type: this.state.photoCover.type, uri: this.state.photoCover.uri });
            axios({
              method: 'post',
              url: 'user/profile_banner',
              data: formdata,
              config: { headers: { 'Content-Type': 'multipart/form-data' } }
            })
              .then(() => {
              })
              .catch(() => {
                ToastAndroid.show('error while updating profile bunner', ToastAndroid.SHORT);
              })
              .then(() => {
                if (!(this.state.currentProfile === this.state.profileImage)) {
                  const formData = new FormData();
                  formData.append('file', { name: this.state.photoProfile.fileName, type: this.state.photoProfile.type, uri: this.state.photoProfile.uri });
                  axios({
                    method: 'post',
                    url: 'user/profile_picture',
                    data: formData,
                    config: { headers: { 'Content-Type': 'multipart/form-data' } }
                  })
                    .then(() => {
                      axios.get('user/profile', {
                        params: {
                          username: this.props.navigation.state.params.username
                        }
                      })
                        .then((res) => {
                          AsyncStorage.setItem('@app:image', res.data.profile_image_url);
                        })
                        .catch((err) => {

                        });
                    })
                    .catch(() => {
                      ToastAndroid.show('error while updating profile picture', ToastAndroid.SHORT);
                    })
                    .then(() => {
                      this.props.navigation.goBack(null);
                    });
                }
              });
          } else if (!(this.state.currentProfile === this.state.profileImage)) {
            const formData = new FormData();
            formData.append('file', { name: this.state.photoProfile.fileName, type: this.state.photoProfile.type, uri: this.state.photoProfile.uri });
            axios({
              method: 'post',
              url: 'user/profile_picture',
              data: formData,
              config: { headers: { 'Content-Type': 'multipart/form-data' } }
            })
              .then(() => {
                axios.get('user/profile', {
                  params: {
                    username: this.props.navigation.state.params.username
                  }
                })
                  .then((res) => {
                    AsyncStorage.setItem('@app:image', res.data.profile_image_url);
                  })
                  .catch((err) => {
                  });
              })
              .catch(() => {
                ToastAndroid.show('error while updating profile picture', ToastAndroid.SHORT);
              })
              .then(() => {
                if (!(this.state.currentCover === this.state.coverImage)) {
                  const formdata = new FormData();
                  formdata.append('file', { name: this.state.photoCover.fileName, type: this.state.photoCover.type, uri: this.state.photoCover.uri });
                  axios({
                    method: 'post',
                    url: 'user/profile_banner',
                    data: formdata,
                    config: { headers: { 'Content-Type': 'multipart/form-data' } }
                  })
                    .then(() => {
                    })
                    .catch(() => {
                      ToastAndroid.show('error while updating profile bunner', ToastAndroid.SHORT);
                    })
                    .then(() => {
                      this.props.navigation.goBack(null);
                    });
                }
              });
          }
          ToastAndroid.show('profile updated', ToastAndroid.SHORT);
          this.setState({ refreshing: false });
        });
    }
  }

  /** when user choose delete profile photo from action sheet
 * @memberof EditProfile
 */
  deleteProfilePhoto() {
    axios.delete('user/profile_picture', {
    })
      .then((response) => {
      })
      .catch((error) => {
      });
  }

  /** when user choose delete cover photo from action sheet
 * @memberof EditProfile
 */
  deleteCoverPhoto() {
    axios.delete('user/profile_banner', {
    })
      .then((response) => {
      })
      .catch((error) => {
      });
  }

  /** update photo menu
    * handle update photo button in update photo menu
    * @memberof EditProfile
    * @param {int} index - index of button pressed
    */
  handleMenu(index) {
    if (this.state.profile) {
      if (index === 1) {
        this.deleteProfilePhoto();
      }
      if (index === 2) {
        this.handleChooseProfile();
      }
    } else {
      if (index === 1) {
        this.deleteCoverPhoto();
      }
      if (index === 2) {
        this.handleChoosePhoto();
      }
    }
  }

  /** when user press button to update cover
 * @memberof EditProfile
 */
  cameraCoverPressed() {
    this.setState({
      profile: false,
    });
    this.ActionSheet.show();
  }

  /** when user press button to update profile photo
 * @memberof EditProfile
 */
  cameraProfilePressed() {
    this.setState({
      profile: true,
    });
    this.ActionSheet.show();
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


        <ScrollView
          refreshControl={(
            <RefreshControl
              enabled={false}
              refreshing={this.state.refreshing}
            />
)}
          style={{ flex: 1 }}
        >
          <ImageBackground
            style={styles.Cover}
            source={{ uri: this.state.coverImage }}
          >
            <View style={styles.bgOverlay}>
              <TouchableOpacity onPress={() => { this.cameraCoverPressed(); }} style={styles.camraCon}>
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
                  <TouchableOpacity onPress={() => { this.cameraProfilePressed(); }} style={styles.camraMiniCon}>
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
          <ActionSheet
            ref={(o) => this.ActionSheet = o}
            options={this.getOptions()}
            cancelButtonIndex={0}
            //destructiveButtonIndex={1}
            onPress={(index) => { this.handleMenu(index); }}
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
