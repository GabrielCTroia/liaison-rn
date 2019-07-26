import { createAppContainer, createSwitchNavigator, createStackNavigator } from 'react-navigation';
import { HomeScreen } from '../screens/HomeScreen';

import { Easing, Animated } from 'react-native';


// const iosTransitionSpec = {
//   duration: 500,
//   easing: Easing.bezier(0.2833, 0.99, 0.31833, 0.99),
//   timing: Animated.timing,
// }

// const transitionConfig = () => {
//   return {
//     transitionSpec: iosTransitionSpec,
//     screenInterpolator: (sceneProps: any) => {
//       const { layout, position, scene } = sceneProps;

//       const thisSceneIndex = scene.index;
//       const height = layout.initHeight;

//       const translateY = position.interpolate({
//         inputRange: [thisSceneIndex - 1, thisSceneIndex],
//         outputRange: [height, 0],
//       })

//       return { transform: [{ translateY }] }
//     },
//   }
// }

const HomeStack = createStackNavigator({
  Home: HomeScreen,
  // Quiz: QuizScreen,
  // Results: ResultsScreen,
});

export default createAppContainer(createSwitchNavigator({
  Main: HomeStack,
}));