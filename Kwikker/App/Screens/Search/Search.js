import React, { Component, Event } from 'react';
import { Text, View, RefreshControl, ScrollView, TouchableOpacity, Image, TextInput, Button } from 'react-native';
import axios from 'axios';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Trend from '../../Components/Trend/Trend';

/** @module Search **/

export default class Search extends Component {
  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state;
    return params;
  };


  constructor(props) {
    super(props);
    this.state = {
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
            onFocus={() => {
              this.props.navigation.navigate('SearchBar', {
                search: '',
                trendId: null
              });
            }}
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
    this.updateTrend();
    this.willFocusListener = this.props.navigation.addListener(
      'willFocus',
      () => {
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
moreTrendLists=({ layoutMeasurement, contentOffset, contentSize }) => {
  if (layoutMeasurement.height + contentOffset.y >= contentSize.height - 1 && this.state.refreshing !== true && this.state.trendsList.length) {
    this.updateTrend(this.state.trendsList[this.state.usersList.length - 1].id);
  }
}


/** Update Trend.
 * Normally the request returns the first 20 trends when null.
 * To retrieve more send the id of the last trend retrieved.
 * @memberof Search
 * @param {int} id - id of trend .
 */
updateTrend(id = null) {
  this.setState({ refreshing: true });
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
      <ScrollView
        refreshControl={(
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this.pullRefresh}
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
              this.props.navigation.navigate('SearchBar', {
                search: item.text,
                trendId: item.id
              });
            }
          }
          >
            <Trend
              text={item.text}
              numberOfKweeks={item.number_of_kweeks}
            />
          </TouchableOpacity>
        ))
        }


      </ScrollView>
    </View>
  );
}
}
