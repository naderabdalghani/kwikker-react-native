import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import StartStackNavigator from './StartStackNavigator';
import DrawerNavigator from './DrawerNavigator';
import ProfileStackNavigator from './ProfileStackNavigator';
import SettingsStackNavigator from './SettingsStackNavigator'

const SwitchNavigator = createSwitchNavigator({

  StartStackNavigator: { screen: StartStackNavigator },
  DrawerNavigator: { screen: DrawerNavigator },
  ProfileStackNavigator: { screen: ProfileStackNavigator },
  SettingsStackNavigator: { screen: SettingsStackNavigator }

});

export default createAppContainer(SwitchNavigator);
