import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { StudioNavigator } from '../features/Studio';

// const HomeStack = createStackNavigator({
//   Home: HomeScreen,
//   // Quiz: QuizScreen,
//   // Results: ResultsScreen,
// });

export default createAppContainer(createSwitchNavigator({
  Main: StudioNavigator,
}));