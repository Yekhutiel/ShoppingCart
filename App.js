import { StatusBar } from 'expo-status-bar';
import {Button, Image, Pressable, StyleSheet, Text, TextInput, View} from 'react-native';
import React, { useState } from 'react';
import MainDisplay from "./Components/MainDisplay";

export default function App() {


  return (
    <View style={styles.container}>
        <MainDisplay />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
