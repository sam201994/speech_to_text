/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {Provider} from 'react-redux';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import Home from './screens/Home';

import configureStore from './configureStore';
const {store} = configureStore();

const MobileApp: () => React$Node = () => {
  return (
    <>
      <StatusBar/>

      <SafeAreaView>
        <Provider store={store}>
          <ScrollView>
            <View>
              <Text>hellosddd</Text>
              <Home />
            </View>
          </ScrollView>
        </Provider>
      </SafeAreaView>
    </>
  );
};


export default MobileApp;
