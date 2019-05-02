import React, { Component } from 'react';
import { Text, View, ScrollView, TouchableNativeFeedback, Image, RefreshControl, TouchableOpacity } from 'react-native';
import axios from 'axios';
import UserInSearch from '../../Components/UserInSearch/UserInSearch';
import styles from './Styles';


export default class FillowersList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usersList: [],
      refreshing: false

    };
  }


  componentDidMount() {
    this.pullRefresh();
    this.willFocusListener = this.props.navigation.addListener(
      'willFocus',
      () => {
        this.pullRefresh();
      }
    );
  }

  pullRefresh= () => {
    this.setState({
      refreshing: true,
    });
    this.updateUsersList();
  }

  moreUsersLists=({ layoutMeasurement, contentOffset, contentSize }) => {
    if (layoutMeasurement.height + contentOffset.y >= contentSize.height - 1 && this.state.refreshing !== true && this.state.usersList.length) {
      this.updateUsersList(this.state.usersList[this.state.usersList.length - 1].username);
    }
  }

  updateUsersList(userName = null) {
    this.setState({ refreshing: true });
    if (this.props.navigation.state.params && this.props.navigation.state.params.userName) {
      axios.get('interactions/followers', {
        params: {
          last_retrieved_username: userName,
          username: this.props.navigation.state.params.userName,
        }
      })
        .then((usersRes) => {
          if (userName === null) {
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
            <Text style={styles.title}>Followers</Text>
          </View>
          <View />
          <View style={styles.dummyElement} />
        </View>


        <ScrollView
          refreshControl={(
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this.pullRefresh}
            />
)} onScroll={({ nativeEvent }) => { this.moreUsersLists(nativeEvent); }} style={{ flex: 1 }}
        >
          {this.state.usersList.map((item, index) => (
            <TouchableOpacity key={item.username}>
              <UserInSearch
                key={item.username}
                profileUrl={item.profile_image_url}
                userName={item.username}
                screenName={item.screen_name}
                following={item.following}
                followsYou={item.follows_you}
                blocked={item.blocked}
                muted={item.muted}
                navigation={this.props.navigation}
              />
            </TouchableOpacity>
          ))
        }

        </ScrollView>
      </View>
    );
  }
}
