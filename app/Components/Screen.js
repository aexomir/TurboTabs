import React from 'react';
import {View, StyleSheet, Text} from 'react-native';

const Screen = ({title, style, ...props}) => {
  return (
    <View style={[styles.container, style]}>
      <Text>{title}</Text>
    </View>
  );
};

export default Screen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
