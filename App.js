import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Dimensions, StyleSheet, Switch, Text, View } from 'react-native';
import Animated, { interpolateColor, useAnimatedStyle, useDerivedValue, withTiming } from 'react-native-reanimated';

const Colors = {
  dark: {
    background: '#1E1E1E',
    circle:'#252525',
    text:'#F8F8F8'
  },
  light: {
    background: '#F8F8F8',
    circle:'#FFF',
    text:'#1E1E1E'
  }
}

const SWITCH_TRACK_COLOR = {
  true: 'rgba(256,0,256,0.2)',
  false: 'rgba(0,0,0,0.1)',
}


export default function App() {

  const [theme, setTheme] = useState('light');

  const progress = useDerivedValue(() => {
    return theme === 'dark' ? withTiming(1) : withTiming(0);
  }, [theme])

  const rStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      progress.value,
      [0, 1],
      [Colors.light.background, Colors.dark.background]
    )
    return { backgroundColor };
  })

  const rStyleCircle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      progress.value,
      [0, 1],
      [Colors.light.circle, Colors.dark.circle]
    )
    return { backgroundColor };
  })

  const rStyleText = useAnimatedStyle(() => {
    const color = interpolateColor(
      progress.value,
      [0, 1],
      [Colors.light.text, Colors.dark.text]
    )

    const backgroundColor = interpolateColor(
      progress.value,
      [0, 1],
      [Colors.light.background, Colors.dark.background]
    )
    return { color,backgroundColor };
  })

  return (
    <Animated.View style={[styles.container, rStyle]}>
    <Animated.Text style={[styles.text,rStyleText]} >Theme</Animated.Text>
      <Animated.View style={[styles.circle,rStyleCircle]} >
        <Switch
          value={theme === 'dark'}
          onValueChange={(toggled) => {
            setTheme(toggled ? 'dark' : 'light');
          }}
          trackColor={SWITCH_TRACK_COLOR}
          thumbColor={'violet'}
        />
      </Animated.View>
    </Animated.View>
  );
}

const SIZE = Dimensions.get('window').width * 0.7;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  circle:{
    width:SIZE,
    height:SIZE,
    backgroundColor:"#FFF",
    justifyContent:"center",
    alignItems:"center",
    borderRadius:SIZE/2,
    shadowOffset:{
      width:0,
      height:20
    },
    shadowOpacity:0.1,
    shadowRadius:10,
    elevation:8
  },
  text:{
    fontSize:70,
    textTransform:"uppercase",
    fontWeight:"700",
    letterSpacing:14,
    marginBottom:30
  }
});
