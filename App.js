/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler';
import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import DetailsScreen from './screens/DetailsScreen';
import PlayerScreen from './screens/PlayerScreen';

const Stack = createStackNavigator();
const appName = 'Native Music';

// You should go for React.PureComponent when you can satisfy any of the below conditions.
//
// State/Props should be an immutable object
// State/Props should not have a hierarchy
// You should call forceUpdate when data changes
// If you are using React.PureComponent you should make sure all child components are also pure.

// So if we have a component that has an imunitable kind on props (string message for example)
// then making it a pure component shall increase performances
// cf.https://medium.com/better-programming/when-to-use-react-purecomponent-723f85738be1

const App: () => React$Node = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home"
                       screenOptions={{title: appName}}>
        <Stack.Screen name="Home"
                      component={HomeScreen} />
        <Stack.Screen name="Details" component={DetailsScreen} />
        <Stack.Screen name="Player" component={PlayerScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
