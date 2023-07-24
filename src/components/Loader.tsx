<<<<<<< HEAD
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Animated,
  Easing,
  Dimensions,
} from 'react-native';
=======
import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Animated, Easing, Dimensions} from 'react-native';
>>>>>>> 42fdec5af1b2e0226ca4c8c6cc74dc7065b3dc8e
import Block from './Block';

<<<<<<< HEAD
const {width, height} = Dimensions.get('window');
=======
const {height} = Dimensions.get('window');
>>>>>>> 42fdec5af1b2e0226ca4c8c6cc74dc7065b3dc8e

const Loader = () => {
  const [spin, setSpin] = useState<any>('0deg');
  const [smallSpin, setSmallSpin] = useState<any>('0deg');

  let spinAnimation = new Animated.Value(0);
  let spinAnimation1 = new Animated.Value(0);

<<<<<<< HEAD
  React.useEffect(() => {
=======
  useEffect(() => {
>>>>>>> 42fdec5af1b2e0226ca4c8c6cc74dc7065b3dc8e
    Animated.loop(
      Animated.timing(spinAnimation, {
        toValue: 1,
        duration: 1400,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ).start();

    setSpin(
      spinAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],
      }),
    );

    Animated.loop(
      Animated.timing(spinAnimation1, {
        toValue: -720,
        duration: 2800,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ).start();

    setSmallSpin(
      spinAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '-720deg'],
      }),
    );
<<<<<<< HEAD
    console.log(spinAnimation1);
  }, []);

  React.useEffect(() => {
    console.log(smallSpin);
  }, [smallSpin]);

  return (
    <View style={[styles.container]}>
      <Block style={[styles.subContainer]}>
=======
  }, []);

  return (
    <View
      style={{
        zIndex: 999,
        width: '100%',
        height: height * 0.8,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Block style={[styles.container]}>
>>>>>>> 42fdec5af1b2e0226ca4c8c6cc74dc7065b3dc8e
        <Animated.View
          style={[styles.reverseSpinner, {transform: [{rotate: spin}]}]}
        />
        <Animated.View
          style={[styles.spinnerBefore, {transform: [{rotate: smallSpin}]}]}
        />
      </Block>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    zIndex: 999,
    width: '100%',
    height: height * 0.8,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  subContainer: {
    flex: 1,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    height: 100,
    width: 100,
  },
  reverseSpinner: {
    position: 'absolute',
    height: 100,
    width: 100,
    borderStyle: 'solid',
    borderWidth: 4,
    borderColor: '#E9ECEF',
    borderTopColor: '#CB0C9F',
    borderLeftColor: '#CB0C9F',
    borderRadius: 50,
  },
  spinnerBefore: {
    position: 'absolute',
    top: 15,
    left: 15,
    right: 15,
    bottom: 15,
    borderWidth: 4,
    borderColor: '#E9ECEF',
    borderTopColor: '#CB0C9F',
    borderLeftColor: '#CB0C9F',
    borderRadius: 50,
    animation: 'spinBack 1s linear infinite',
  },
});

export default Loader;
