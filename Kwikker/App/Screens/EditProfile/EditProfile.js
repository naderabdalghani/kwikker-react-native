import React from 'react';
import { Text, View, ScrollView, Image, TouchableNativeFeedback } from 'react-native';
import CustomTextInput from '../../Components/CustomTextInput/CustomTextInput';
import styles from './Styles';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { Name: '', Bio: '', Location: '', Web: '', BirthOfDate: '' };
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
          <View />
          <View style={styles.dummyElement} />
        </View>

        <View style={styles.Cover} />

        <ScrollView style={{ flex: 1 }}>
          <View style={{ flex: 1, flexDirection: 'row' }}>
            <View style={styles.ProfileImageContainer}>
              <Image
                style={styles.ProfileImage}
                source={{
                  uri: 'https://www.sparklabs.com/forum/styles/comboot/theme/images/default_avatar.jpg'
                }}
              />
            </View>
          </View>
          <CustomTextInput
            placeholder=""
            label="Name"
            secureTextEntry={false}
            value={this.state.Name}
            onChangeText={(Name) => this.setState({ Name })}
            autoFocus={false}
          />
          <CustomTextInput
            placeholder=""
            label="Bio"
            secureTextEntry={false}
            value={this.state.Bio}
            onChangeText={(Bio) => this.setState({ Bio })}
            autoFocus={false}
          />
          <CustomTextInput
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
          <CustomTextInput
            placeholder="Add your dato of birth"
            label="Birth date"
            secureTextEntry={false}
            value={this.state.BirthOfDate}
            onChangeText={(BirthOfDate) => this.setState({ BirthOfDate })}
            autoFocus={false}
          />
        </ScrollView>
      </View>
    );
  }
}
