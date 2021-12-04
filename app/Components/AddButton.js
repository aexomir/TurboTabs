import React, {useRef} from 'react';
import {View, StyleSheet, TouchableHighlight, Animated} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';

const AddButton = props => {
  const buttonSize = useRef(new Animated.Value(1)).current;
  const mode = useRef(new Animated.Value(0)).current;

  const handleAdd = () => {
    Animated.sequence([
      Animated.timing(buttonSize, {
        toValue: 0.95,
        duration: 200,
        useNativeDriver: false,
      }),
      Animated.timing(buttonSize, {
        toValue: 1,
        useNativeDriver: false,
      }),
      Animated.timing(mode, {
        toValue: mode._value === 0 ? 1 : 0,
        useNativeDriver: false,
      }),
    ]).start();
  };

  const size = {
    transform: [{scale: buttonSize}],
  };
  const rotation = mode.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '45deg'],
  });
  const thermometerX = mode.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -60],
  });
  const thermometerY = mode.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -60],
  });
  const timeX = mode.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 5],
  });
  const timeY = mode.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -100],
  });
  const pulseX = mode.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 70],
  });
  const pulseY = mode.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -60],
  });

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.button, size]}>
        <Animated.View
          style={{
            position: 'absolute',
            left: thermometerX,
            top: thermometerY,
            opacity: mode,
          }}>
          <View style={styles.secondaryButton}>
            <Feather name="thermometer" size={24} color="white" />
          </View>
        </Animated.View>
        <Animated.View
          style={{
            position: 'absolute',
            left: timeX,
            top: timeY,
            opacity: mode,
          }}>
          <View style={styles.secondaryButton}>
            <Feather name="clock" size={24} color="white" />
          </View>
        </Animated.View>
        <Animated.View
          style={{
            position: 'absolute',
            left: pulseX,
            top: pulseY,
            opacity: mode,
          }}>
          <View style={styles.secondaryButton}>
            <Feather name="activity" size={24} color="white" />
          </View>
        </Animated.View>
        <TouchableHighlight underlayColor={'transparent'} onPress={handleAdd}>
          <Animated.View
            style={{
              transform: [{rotate: rotation}],
            }}>
            <FontAwesome name="plus" size={24} color={'#fff'} />
          </Animated.View>
        </TouchableHighlight>
      </Animated.View>
    </View>
  );
};

export default AddButton;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'absolute',
    alignItems: 'center',
  },
  button: {
    height: 72,
    width: 72,
    borderRadius: 36,
    backgroundColor: '#fe4a49',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: -60,
    shadowColor: '#7F58FF',
    shadowRadius: 5,
    shadowOffset: {
      height: 10,
      width: 0,
    },
    shadowOpacity: 0.3,
    borderWidth: 3,
    borderColor: '#fff',
  },
  secondaryButton: {
    // position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#fe4a49',
  },
});
