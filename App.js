import React from 'react';
import {View, StyleSheet, LogBox} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import TabBar from './app/Navigation/2';

LogBox.ignoreAllLogs(true);

const App = props => {
  return (
    <NavigationContainer>
      <TabBar />
    </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({});
