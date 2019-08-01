import { createStackNavigator } from 'react-navigation';
import { HomeScreenContainer } from './containers/HomeScreenContainer';

export const StudioNavigator = createStackNavigator({
  Home: HomeScreenContainer,
});
