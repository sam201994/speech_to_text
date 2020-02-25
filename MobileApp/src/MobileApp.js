/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {Provider} from 'react-redux';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';

import Home from './screens/Home';
import configureStore from './configureStore';
import RandomVideo from './screens/Home/RandomVideo';

const {store} = configureStore();
const Stack = createStackNavigator();

export default class MobileApp extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <NavigationContainer initialRouteName="home">
          <Stack.Navigator>
            <Stack.Screen name="home" component={Home} />
            <Stack.Screen name="video" component={RandomVideo} />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    );
  }
}
