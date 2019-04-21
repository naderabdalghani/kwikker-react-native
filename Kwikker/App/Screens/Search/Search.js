import React, { Component, Event } from 'react';
import { Text, View, RefreshControl, ScrollView, TouchableOpacity, Image, TextInput, Button } from 'react-native';
import axios from 'axios';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import SearchTap from '../../Components/SearchTaps/SearchTaps';
import Trend from '../../Components/Trend/Trend';
import styles from './Styles';

/** @module Search **/

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
      kweeksList: [],
      trendsList: [],
      refreshing: true

    };
  }

  componentDidMount() {
    this.props.navigation.setParams({
      headerTitle: (
        <View style={{ width: '85%', marginTop: 5 }}>
          <TextInput
            ref={(ref) => { this.textInput = ref; }}
            value={this.state.search}
            onChangeText={(search) => { this.setState({ search }, () => { this.updateList(); }); }}
            placeholder=" Search Kwikker "
            clearButtonMode="always"
          />
        </View>
      ),
      headerRight: (

        <EvilIcons onPress={() => { this.setState({ search: '' }, () => { this.textInput.clear(); }); }} name="close" size={35} color="rgb(136, 153, 166)" style={{ margin: 5 }} />

      ),
      headerLeft: (
        <EvilIcons name="search" size={35} color="rgb(136, 153, 166)" style={{ margin: 5 }} />
      ),
    });
    this.updateList();
    this.updateTrend();
    this.willFocusListener = this.props.navigation.addListener(
      'willFocus',
      () => {
        this.updateList();
        this.updateTrend();
      }
    );
  }


/** Get more Lists when we get to the end of the scrollView.
 * Check we reached end of content
 * @memberof Search
 * @param {int} layoutMeasurement - size of the layout .
 * @param  {int} contentOffset - position on screen
 * @param  {int} contentSize - size of all content
 */
moreLists=({ layoutMeasurement, contentOffset, contentSize }) => {
  if (layoutMeasurement.height + contentOffset.y >= contentSize.height - 1 && this.state.refreshing !== true && this.state.usersList.length) {
    this.updateList(this.state.usersList[this.state.usersList.length - 1].username);
  }
}

/** Get more Lists when we get to the end of the scrollView.
 * Check we reached end of content
 * @memberof Search
 * @param {int} layoutMeasurement - size of the layout .
 * @param  {int} contentOffset - position on screen
 * @param  {int} contentSize - size of all content
 */
moreTrendLists=({ layoutMeasurement, contentOffset, contentSize }) => {
  if (layoutMeasurement.height + contentOffset.y >= contentSize.height - 1 && this.state.refreshing !== true && this.state.trendsList.length) {
    this.updateTrend(this.state.trendsList[this.state.usersList.length - 1].id);
  }
}


/** render taps (Pepole / Kweeks) Or trends
 * if input text empty render trends
 * else render taps
 * @memberof Search
 */
tapsOrTrends() {
  if (this.state.search === '') {
    return (
      <ScrollView
        refreshControl={(
          <RefreshControl
            refreshing={this.state.refreshing}
            enabled={false}
          />
)}
        style={{ flex: 1 }}
        onScroll={({ nativeEvent }) => { this.moreTrendLists(nativeEvent); }}
      >
        <Text style={{ fontSize: 20, margin: 5, }}> Trends for you </Text>
        {this.state.trendsList.map((item, index) => (
          <TouchableOpacity
            key={item.id}
            onPress={() => {
              this.setState({ search: item.text }, () => {
                this.props.navigation.setParams({
                  headerTitle: (
                    <View style={{ width: '85%', marginTop: 5 }}>
                      <TextInput
                        ref={(ref) => { this.textInput = ref; }}
                        value={this.state.search}
                        onChangeText={(search) => { this.setState({ search }, () => { this.updateList(); }); }}
                        placeholder=" Search Kwikker "
                      />
                    </View>
                  ),


                });
              }, () => { this.updateList(); });
            }}
          >
            <Trend
              text={item.text}
              numberOfKweeks={item.number_of_kweeks}
            />
          </TouchableOpacity>
        ))
        }


      </ScrollView>
    );
  }
  return (
    <SearchTap screenProps={{ rootNav: this.props.navigation, refreshing: this.state.refreshing, users: this.state.usersList, kweeks: this.state.kweeksList, moreLists: (data) => this.moreLists(data) }} />

  );
}


/** Update List.
 * gets first 20 users/kweeks With default parameter (username=null)
 * To retrieve more send the username of the last retrieved user.
 * @memberof Search
 * @param {string} username - The username of user .
 */
updateList(username = null) {
  this.setState({ refreshing: true });
  axios.all([
    axios.get('search/users', {
      params: {
        last_retrieved_username: username,
        search_text: this.state.search
      }
    }),
    axios.get('search/kweeks', {
      params: {
        last_retrieved_kweek_id: username,
        search_text: this.state.search
      }
    })])
    .then(axios.spread((usersRes, kweeksRes) => {
      if (username === null) {
        this.setState({
          usersList: usersRes.data,
          //kweeksList: kweeksRes.data
        });
      } else {
        this.setState((prevState) => ({
          usersList: prevState.usersList.concat(usersRes.data),
          //kweeksList: prevState.kweeksList.concat(kweeksRes.data)
        }));
      }

      this.setState({ refreshing: false });
    }))
    .catch((error) => {
      // handle error
      // console.log(error);
    })
    .then(() => {
      // always executed
    });
}

/** Update Trend.
 * Normally the request returns the first 20 trends when null.
 * To retrieve more send the id of the last trend retrieved.
 * @memberof Search
 * @param {int} id - id of trend .
 */
updateTrend(id = null) {
  axios.get('trends/', {
    params: {
      last_retrieved_trend_id: id
    }
  })
    .then((response) => {
      if (id === null) {
        this.setState({
          trendsList: response.data
        });
      } else {
        this.setState((prevState) => ({ trendsList: prevState.trendsList.concat(response.data)
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
      {this.tapsOrTrends()}
    </View>
  );
}
}
