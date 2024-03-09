import { StatusBar } from 'expo-status-bar';
import {Button, Image, Pressable, StyleSheet, Text, TextInput, View} from 'react-native';
import React, { useState } from 'react';

export default function App() {
  const [text, setText] = useState('');

  const handleSaveText = () => {
    console.warn('Text written: ' + text)
  };


  return (
    <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image style={styles.image} source={require('./assets/Cart.png')}/>
        </View>

      <TextInput
          placeholder={'Type here ...'}
          value={text}
          onChangeText={text => setText(text)}

          style={{
            position: 'absolute',
            top: 290, backgroundColor: '#bbbaba',
            width: 170, textAlign: 'center',
            borderRadius: 30
      }}
      />

      <Pressable style={{
        position: 'absolute',
        top: 330,
        width: 180, height: 30,
        backgroundColor: '#c02e2e', borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <Text>ADD TO CART</Text>
      </Pressable>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#dadada',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageContainer:{
    position: "absolute",
    top: 70,
    right: 100,

    width: 200,
    height: 200,
  },
    image: {
     width: '100%',
      height: '100%',
    }
});
