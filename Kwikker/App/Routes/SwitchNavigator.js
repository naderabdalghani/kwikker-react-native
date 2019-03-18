import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import StartStackNavigator from './StartStackNavigator';
import DrawerNavigator from './DrawerNavigator';

const SwitchNavigator = createSwitchNavigator({

  StartStackNavigator: { screen: StartStackNavigator },
  DrawerNavigator: { screen: DrawerNavigator },

});

export default createAppContainer(SwitchNavigator);
