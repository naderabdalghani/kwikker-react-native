import React, { Component } from 'react';
import { Text, View, ScrollView, TouchableOpacity, Image, TextInput, Button } from 'react-native';
import axios from 'axios';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import SearchTap from '../../Components/SearchTaps/SearchTaps';
import styles from './Styles';

export default class Search extends Component {
  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state;
    return params;
  };


  constructor(props) {
    super(props);
    this.state = {
      search: '',
      usersList: [],
      refreshing: true

    };
  }

  componentDidMount() {
    this.props.navigation.setParams({
      headerTitle: (
        <View style={{ width: '85%', marginTop: 5 }}>
          <TextInput
            onChangeText={(value) => { this.setState({ search: value }); this.updateList(); }}
            placeholder=" Search Kwikker "
            clearButtonMode="always"
          />
        </View>
      ),
      headerRight: (
        <Text />
      ),
      headerLeft: (
        <EvilIcons name="search" size={35} color="rgb(136, 153, 166)" style={{ margin: 5 }} />
      ),
    });
    this.updateList();
  }

/** Get more Lists when we get to the end of the scrollView.
 * Check we reached end of content
 * @param {int} layoutMeasurement - size of the layout .
 * @param  {int} contentOffset - position on screen
 * @param  {int} contentSize - size of all content
 */
moreLists=({ layoutMeasurement, contentOffset, contentSize }) => {
  if (layoutMeasurement.height + contentOffset.y >= contentSize.height - 1 && this.state.refreshing !== true) {
    this.updateList(this.state.usersList[this.state.usersList.length - 1].username);
  }
}


/** Update List.
 * gets first 20 users With default parameter (id=null)
 * To retrieve more send the username of the last retrieved user.
 * @param {int} username - The username of user .
 */
updateList(username = null) {
  axios.get('/search/users', {
    params: {
      last_retrieved_username: username,
      search_text: this.state.search
    }
  })
    .then((response) => {
      this.setState({ refreshing: true });
      if (username === null) {
        this.setState({
          usersList: response.data
        });
      } else {
        this.setState((prevState) => ({ usersList: prevState.usersList.concat(response.data)
        }));
      }
      this.setState({ refreshing: false });
    })
    .catch((error) => {
      // handle error
      // console.log(error);
    })
    .then(() => {
      // always executed
    });
}


render() {
  return (
    <View style={{ flex: 1 }}>


      <SearchTap screenProps={{ rootNav: this.props.navigation, users: this.state.usersList, moreLists: (data) => this.moreLists(data) }} />

    </View>
  );
}
}
