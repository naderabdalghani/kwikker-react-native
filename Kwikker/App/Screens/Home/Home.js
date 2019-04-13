import React, { Component } from 'react';
import { Text, View, Image, ScrollView, TouchableOpacity, RefreshControl } from 'react-native';
import axios from 'axios';
import Kweek from '../../Components/Kweek/Kweek';

export default class Home extends Component {
static navigationOptions = {
  headerLeft:
  <TouchableOpacity>
    <Image source={require('./../../Assets/Images/pp.png')} style={{ width: 40, height: 40, borderRadius: 20, marginLeft: 10 }} />
  </TouchableOpacity>
};

constructor(props) {
  super(props);
  this.state = {
    kweeks: [],
    refreshing: false,
  };
}

componentDidMount() {
  this.pullRefresh();
}

/**
 * Pull to refresh functionality
 */
pullRefresh= () => {
  this.setState({
    refreshing: true,
  });
  this.updateKweeks();
}

/** Get more Kweeks when we get to the end of the scrollView.
 * Check we reached end of content
 * @param {int} layoutMeasurement - size of the layout .
 * @param  {int} contentOffset - position on screen
 * @param  {int} contentSize - size of all content
 */
moreKweeks=({ layoutMeasurement, contentOffset, contentSize }) => {
  if (layoutMeasurement.height + contentOffset.y >= contentSize.height - 1 && this.state.refreshing !== true) {
    this.setState({
      refreshing: true,
    });
    this.updateKweeks(this.state.kweeks[this.state.kweeks.length - 1].id);
  }
}

/** Update Kweeks.
 * gets first 20 Kweeks With default parameter (id=null)
 * To retrieve more send the id of the last retrieved kweek.
 * @param {int} id - The id of Kweek .
 */
updateKweeks(id = null) {
  axios.get('kweeks/timelines/home', {
    params: {
      last_retrieved_kweek_id: id
    }
  })
    .then((response) => {
      if (id === null) {
        this.setState({
          kweeks: response.data
        });
      } else {
        this.setState((prevState) => ({ kweeks: prevState.kweeks.concat(response.data)
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
        onScroll={({ nativeEvent }) => { this.moreKweeks(nativeEvent); }}
      >
        {this.state.kweeks.map((item, index) => (
          <Kweek
            key={item.id}
            date={item.created_at}
            profileImageUrl={item.user.profile_image_url}
            screenName={item.user.screen_name}
            userName={item.user.username}
            numberOfLikes={item.number_of_likes}
            numberOfRekweeks={item.number_of_rekweeks}
            numberOfReplies={item.number_of_replies}
            kweetText={item.text}
            liked={item.liked_by_user}
            rekweeked={item.rekweeked_by_user}
            rekweekerUserName={item.rekweek_info.rekweeker_username}
          />
        ))
       }
      </ScrollView>
      <TouchableOpacity onPress={() => this.props.navigation.navigate('CreateTweet')} style={{ width: 60, height: 60, borderRadius: 30, alignItems: 'flex-end', marginLeft: '80%', marginBottom: '4%' }}>
        <Image source={require('./../../Assets/Images/tweet1.png')} style={{ width: 60, height: 60, borderRadius: 30, alignItems: 'flex-end', marginLeft: '80%', marginBottom: '4%' }} />
      </TouchableOpacity>
    </View>
  );
}
}
