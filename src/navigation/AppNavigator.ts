import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { StudioNavigator } from '../features/Studio';

export default createAppContainer(createSwitchNavigator({
  Main: StudioNavigator,
}));