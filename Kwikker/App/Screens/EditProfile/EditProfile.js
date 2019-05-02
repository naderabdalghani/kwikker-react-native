import React from 'react';
import { Text, View, ScrollView, Image, TouchableNativeFeedback, TouchableOpacity } from 'react-native';
import { DatePicker } from 'native-base';
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
          <TouchableOpacity>
            <Text style={{color: '#1DA1F2', fontSize: 17, fontWeight: 'bold', marginTop: 5, marginLeft: 5, }}>SAVE</Text>
          </TouchableOpacity>
        </View>

        
        <ScrollView style={{ flex: 1 }}>
          <Image
            style={styles.Cover}
            source={{ uri: this.state.coverImage }}
          />
          <View style={{ flex: 1, flexDirection: 'row' }}>
            <View style={styles.ProfileImageContainer}>
              <Image
                style={styles.ProfileImage}
                source={{ uri: this.state.profileImage }}
              />
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
