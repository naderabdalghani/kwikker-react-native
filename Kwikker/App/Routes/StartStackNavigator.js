import { createStackNavigator, createAppContainer } from 'react-navigation';
import StartScreen from '../Screens/StartScreen/StartScreen';
import Login from '../Screens/Login/Login';
import Signup from '../Screens/Signup/Signup';
import ForgotPassword from '../Screens/ForgotPassword/ForgotPassword';


const StartStackNavigator = createStackNavigator({

  StartScreen: {
    screen: StartScreen,
    navigationOptions: {
      header: null,
    },
  },
  Login: {
    screen: Login,
    navigationOptions: {
      header: null,
    },
  },
  Signup: { screen: Signup },

  ForgotPassword: {
    screen: ForgotPassword
  },

});

export default createAppContainer(StartStackNavigator);
