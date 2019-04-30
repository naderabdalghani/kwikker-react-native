import React, { Component } from 'react';
import { Text, View, Image, ScrollView, TouchableOpacity, RefreshControl } from 'react-native';
import axios from 'axios';
import { DrawerActions } from 'react-navigation';
import Kweek from '../../Components/Kweek/Kweek';
import KweekExtended from '../../Components/KweekExtended/KweekExtended'

export default class Home extends Component {
/*static navigationOptions = ({ navigation }) => {
  return {
    headerLeft:
  <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
    <Image source={require('./../../Assets/Images/pp.png')} style={{ width: 40, height: 40, borderRadius: 20, marginLeft: 10 }} />
  </TouchableOpacity>
  };
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
  console.log('componentdidMount');
}

/**
 * Pull to refresh functionality
 */
/*pullRefresh= () => {
  console.log('pullRefresh');
  this.setState({
    refreshing: true,
  });
  console.log(this.state.refreshing);
  this.updateKweeks();
}

/** Get more Kweeks when we get to the end of the scrollView.
 * Check we reached end of content
 * @param {int} layoutMeasurement - size of the layout .
 * @param  {int} contentOffset - position on screen
 * @param  {int} contentSize - size of all content
 */
/*moreKweeks=({ layoutMeasurement, contentOffset, contentSize }) => {
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
/*updateKweeks(id = null) {
  console.log('updateKweeks');
  axios.get('kweeks/timelines/home', {
    params: {
      last_retrieved_kweek_id: id
    }
  })
    .then((response) => {
      console.log(response.status);
      if (id === null) {
        console.log('response id null');
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
      console.log('get tweets error');
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
            id={item.id}
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
            rekweekerUserName={item.rekweek_info}
            mediaUrl={item.media_url}
          />
        ))
       }
      </ScrollView>
      <TouchableOpacity onPress={() => this.props.navigation.navigate('CreateTweet')} style={{ position: 'absolute', right: 20, bottom: 20, width: 60, height: 60, borderRadius: 30, alignItems: 'flex-end' }}>
        <Image source={require('./../../Assets/Images/tweet1.png')} style={{ width: 60, height: 60, borderRadius: 30, alignItems: 'flex-end' }} />
      </TouchableOpacity>
    </View>
  );
}
}
*/
  render() {
    const { navigation } = this.props;
    const key = navigation.getParam('key', null);
    const id = navigation.getParam('id', null);
    const date = navigation.getParam('date', null);
    const profileImageUrl = navigation.getParam('profileImageUrl', null);
    const screenName = navigation.getParam('screenName', null);
    const userName = navigation.getParam('userName', null);
    const numberOfLikes = navigation.getParam('numberOfLikes', null);
    const numberOfRekweeks = navigation.getParam('numberOfRekweeks', null);
    const numberOfReplies = navigation.getParam('numberOfReplies', null);
    const kweetText = navigation.getParam('kweetText', null);
    const liked = navigation.getParam('liked', null);
    const rekweeked = navigation.getParam('rekweeked', null);
    const rekweekerUserName = navigation.getParam('rekweekerUserName', null);
    const mediaUrl = navigation.getParam('mediaUrl', null);
    const replyTo = navigation.getParam('replyTo', null);
    const following = navigation.getParam('following', null);
    const mentions = navigation.getParam('mentions', null);
    return (
      <View>
        <KweekExtended
          key={key}
          id={id}
          date={date}
          profileImageUrl={profileImageUrl}
          screenName={screenName}
          userName={userName}
          numberOfLikes={numberOfLikes}
          numberOfRekweeks={numberOfRekweeks}
          numberOfReplies={numberOfReplies}
          kweetText={kweetText}
          liked={liked}
          rekweeked={rekweeked}
          rekweekerUserName={rekweekerUserName}
          mediaUrl={mediaUrl}
          replyTo={replyTo}
          following={following}
          mentions={mentions}
        />
      </View>
    );
  }
}