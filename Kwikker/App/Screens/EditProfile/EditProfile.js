import React from 'react';
import { Text, View,ScrollView,Image,} from 'react-native';
import CustomTextInput from '../../Components/CustomTextInput/CustomTextInput'
import styles from './Styles';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { Name: '', Bio: '', Location: '', Web: '', BirthOfDate:'' };
  }
  render() {
    return (
      
      <View style={{flex:1}} >
          <View style={styles.Cover} >
          </View>
        
          <ScrollView style={{flex:1}}>
          <View style={{flex:1,flexDirection:'row'}}>
            <View style={styles.ProfileImageContainer}>
              <Image style={styles.ProfileImage}
                source={{
                  uri: 'https://www.sparklabs.com/forum/styles/comboot/theme/images/default_avatar.jpg'
                  }}/>
            </View>
          </View>
          <CustomTextInput
            placeholder=""
            label="Name"
            secureTextEntry={false}
            value={this.state.Name}
            onChangeText={(Name) => this.setState({Name})}
            autoFocus={false}
          />
          <CustomTextInput
            placeholder=""
            label="Bio"
            secureTextEntry={false}
            value={this.state.Bio}
            onChangeText={(Bio) => this.setState({Bio})}
            autoFocus={false}
          />
          <CustomTextInput
            placeholder=""
            label="Location"
            secureTextEntry={false}
            value={this.state.Location}
            onChangeText={(Location) => this.setState({Location})}
            autoFocus={false}
          />
          <CustomTextInput
            placeholder=""
            label="Website"
            secureTextEntry={false}
            value={this.state.Web}
            onChangeText={(Web) => this.setState({Web})}
            autoFocus={false}
          />
          <CustomTextInput
            placeholder="Add your dato of birth"
            label="Birth date"
            secureTextEntry={false}
            value= {this.state.BirthOfDate}
            onChangeText={(BirthOfDate) => this.setState({BirthOfDate})}
            autoFocus={false}
          />
          </ScrollView>
          </View>
    )
  }
}

 