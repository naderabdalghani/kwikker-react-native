import React, { Component, Event } from 'react';
import { Text, View, RefreshControl, ScrollView, TouchableOpacity, Image, TextInput, Button } from 'react-native';
import axios from 'axios';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import SearchTap from '../../Components/SearchTaps/SearchTaps';
import Trend from '../../Components/Trend/Trend';

/** @module SearchBar **/

export default class SearchBar extends Component {
  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state;
    return params;
  };


  constructor(props) {
    super(props);
    this.state = {
      search: '',
      usersList: [],
      kweeksList: [],
      trendsKweeks: [],
      refreshing: true

    };
  }

  componentDidMount() {
    this.props.navigation.setParams({
      headerTitle: (
        <View style={{ width: '85%', marginTop: 5 }}>
          <TextInput
            defaultValue={this.props.navigation.state.params.search}
            ref={(ref) => { this.textInput = ref; }}
            onChangeText={(search) => {
              this.setState({ search }, () => {
                this.updateUsersList();
                this.updatekweeksList();
              });
            }}
            placeholder=" Search Kwikker "
            clearButtonMode="always"
          />
        </View>
      ),
      headerRight: (

        <EvilIcons
          onPress={() => {
            this.textInput.clear(); this.setState({ search: '' }, () => {
              this.updateUsersList();
              this.updatekweeksList();
            });
          }} name="close" size={35} color="rgb(136, 153, 166)" style={{ margin: 5 }}
        />

      ),
    });
    this.setState({ search: this.props.navigation.state.params.search });
    if (this.props.navigation.state.params.search === '') {
      this.updateUsersList();
      this.updatekweeksList();
    } else {
      this.updateTrendsKweeks();
    }

    this.willFocusListener = this.props.navigation.addListener(
      'willFocus',
      () => {
        this.setState({ search: this.props.navigation.state.params.search });
        if (this.props.navigation.state.params.search === '') {
          this.updateUsersList();
          this.updatekweeksList();
        } else {
          this.updateTrendsKweeks();
        }
      }
    );
  }


/** Get more Users Lists when we get to the end of the scrollView.
 * Check we reached end of content
 * @memberof SearchBar
 * @param {int} layoutMeasurement - size of the layout .
 * @param  {int} contentOffset - position on screen
 * @param  {int} contentSize - size of all content
 */
moreUsersLists=({ layoutMeasurement, contentOffset, contentSize }) => {
  if (layoutMeasurement.height + contentOffset.y >= contentSize.height - 1 && this.state.refreshing !== true && this.state.usersList.length) {
    this.updateUsersList(this.state.usersList[this.state.usersList.length - 1].username);
  }
}

/** Get more Kweeks Lists when we get to the end of the scrollView.
 * Check we reached end of content
 * @memberof SearchBar
 * @param {int} layoutMeasurement - size of the layout .
 * @param  {int} contentOffset - position on screen
 * @param  {int} contentSize - size of all content
 */
moreKweeksLists=({ layoutMeasurement, contentOffset, contentSize }) => {
  if (layoutMeasurement.height + contentOffset.y >= contentSize.height - 1 && this.state.refreshing !== true && this.state.kweeksList.length) {
    this.updateKweeksList(this.state.kweeksList[this.state.kweeksList.length - 1].username);
  }
}

/** Get more trends Kweeks when we get to the end of the scrollView.
 * Check we reached end of content
 * @memberof SearchBar
 * @param {int} layoutMeasurement - size of the layout .
 * @param  {int} contentOffset - position on screen
 * @param  {int} contentSize - size of all content
 */
moreTrendsKweeks=({ layoutMeasurement, contentOffset, contentSize }) => {
  if (layoutMeasurement.height + contentOffset.y >= contentSize.height - 1 && this.state.refreshing !== true && this.state.trendsKweeks.length) {
    this.updateTrendsKweeks(this.state.trendsKweeks[this.state.trendsKweeks.length - 1].id);
  }
}

/** render trend kweeks or search people and kweeks
 * @memberof SearchBar
 */
searchKweeksOrGetTrends() {
  if (this.props.navigation.state.params.search !== '' && this.props.navigation.state.params.search === this.state.search) {
    return (
      <SearchTap screenProps={{ rootNav: this.props.navigation, refreshing: this.state.refreshing, users: this.state.usersList, kweeks: this.state.trendsKweeks, moreKweeksLists: (data) => this.moreTrendsKweeks(data), moreUsersLists: (data) => this.moreUsersLists(data) }} />

    );
  }
  return (
    <SearchTap screenProps={{ rootNav: this.props.navigation, refreshing: this.state.refreshing, users: this.state.usersList, kweeks: this.state.kweeksList, moreKweeksLists: (data) => this.moreKweeksLists(data), moreUsersLists: (data) => this.moreUsersLists(data) }} />

  );
}


/** Update Users List.
 * gets first 20 users With default parameter (username=null)
 * To retrieve more send the username of the last retrieved user.
 * @memberof SearchBar
 * @param {string} username - The username of user .
 */
updateUsersList(username = null) {
  this.setState({ refreshing: true });

  axios.get('search/users', {
    params: {
      last_retrieved_username: username,
      search_text: this.state.search
    }
  })
    .then((usersRes) => {
      if (username === null) {
        this.setState({
          usersList: usersRes.data,
        });
      } else {
        this.setState((prevState) => ({
          usersList: prevState.usersList.concat(usersRes.data),
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

/** Update kweeks List.
 * gets first 20 kweeks With default parameter (username=null)
 * To retrieve more send the username of the last retrieved user.
 * @memberof SearchBar
 * @param {string} username - The username of user .
 */
updatekweeksList(username = null) {
  this.setState({ refreshing: true });

  axios.get('search/kweeks', {
    params: {
      last_retrieved_kweek_id: username,
      search_text: this.state.search
    }
  })
    .then((kweeksRes) => {
      if (username === null) {
        this.setState({
          kweeksList: kweeksRes.data
        });
      } else {
        this.setState((prevState) => ({
          kweeksList: prevState.kweeksList.concat(kweeksRes.data)
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

/** Update trends Kweeks.
 * Normally the request returns the first 20 kweeks when null.
 * To retrieve more send the id of the last kweek retrieved.
 * @memberof SearchBar
 * @param {string} id - The id of trend .
 */
updateTrendsKweeks(id = null) {
  this.setState({ refreshing: true });
  axios.get('/trends/kweeks', {
    params: {
      last_retrieved_kweek_id: id,
      trend_id: this.props.navigation.state.params.trendId
    }
  })
    .then((response) => {
      if (id === null) {
        this.setState({
          trendsKweeks: response.data
        });
      } else {
        this.setState((prevState) => ({ trendsKweeks: prevState.trendsKweeks.concat(response.data)
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
      {this.searchKweeksOrGetTrends()}
    </View>
  );
}
}
