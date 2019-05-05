import React from 'react';
import { Text, View, Image, ScrollView, RefreshControl, TouchableOpacity, TouchableNativeFeedback } from 'react-native';
import axios from 'axios';
import BlockedAccount from '../../Components/BlockedAccount/BlockedAccount';
import Styles from './Styles';

/** @module BlockedAccounts **/

export default class BlockedAccounts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      usersList: [],
      refreshing: true,
      blockedOrNot: true,
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

  /** pull to refresh functionality.
   * update block list.
   * @memberof BlockedAccounts
  */
  pullRefresh= () => {
    this.setState({ refreshing: false },
      () => {
        this.block();
      });
  }

  /** content of blocked list.
  * check if there is any block account or not.
  * @memberof BlockedAccounts
  */
  isThereBlockedAccounts() {
    if (this.state.blockedOrNot) {
      return (
        <ScrollView
          refreshControl={(
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this.pullRefresh}
            />
          )}
          style={{ flex: 1 }}
        >
          {this.state.usersList.map((item, index) => (
            <TouchableOpacity
              key={item.username}
            >
              <BlockedAccount
                key={item.username}
                profileUrl={item.profile_image_url}
                screenName={item.screen_name}
                following={item.following}
                followsYou={item.follows_you}
                userName={item.username}
                navigation={this.props.navigation}
                pullRefresh={this.pullRefresh.bind(this)}
              />
            </TouchableOpacity>
          ))
          }
        </ScrollView>
      );
    }

    return (
      <View style={{ fles: 1, alignContent: 'center', alignItems: 'center', backgroundColor: '#E1E8ED', height: '100%' }}>
        <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#000', marginVertical: 10, paddingTop: '70%' }}>
          You aren't blocking anyone
        </Text>
        <Text style={{ color: '#657786' }}>
          When you block someone, that person
        </Text>
        <Text style={{ color: '#657786' }}>
          won't be able to follow you or message you,
        </Text>
        <Text style={{ color: '#657786' }}>
          and you won't see notifications from
        </Text>
        <Text style={{ color: '#657786' }}>
          them
        </Text>
      </View>
    );
  }

  /** blocked accounts.
  * gets list of blocked account.
  * @memberof BlockedAccounts
  */

  block() {
    axios.get('/interactions/blocks', {

    })
      .then((response) => {
        this.setState({
          usersList: response.data, blockedOrNot: true,
        });
        if (response.data.length === 0) {
          this.setState({
            blockedOrNot: false,
          });
        }
      })
      .catch((error) => {
        this.setState({ blockedOrNot: false });
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


        <View style={Styles.header}>
          <View style={Styles.backButtonContainer}>
            <TouchableNativeFeedback onPress={() => this.props.navigation.goBack(null)}>
              <Image
                style={Styles.backButton}
                source={require('./../../Assets/Images/back_button.png')}
              />
            </TouchableNativeFeedback>
          </View>
          <View style={Styles.titleContainer}>
            <Text style={Styles.title}>Blocked Accounts</Text>
          </View>
          <View />
          <View style={Styles.dummyElement} />
        </View>

        {this.isThereBlockedAccounts()}


      </View>
    );
  }
}
