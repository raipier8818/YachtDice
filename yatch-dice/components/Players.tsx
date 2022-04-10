import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Constants from 'expo-constants';
import Scoreboard from './Scoreboard';
import { useEffect, useState } from 'react';

interface prop{
  mainOptions: any;
}

export default function Players(props: prop) {

  return (
      <View style={styles.container}>
          <Scoreboard
            options={props.mainOptions}
            name={'Player 1'}
            id={1}
          />
          <Scoreboard
            options={props.mainOptions}
            name={'Player 2'}
            id={2}
          />
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'grey',
    // margin: Constants.statusBarHeight,
    borderRadius: Constants.statusBarHeight,
    // padding: Constants.statusBarHeight,
    flexDirection: 'row',
    justifyContent: 'space-around',
    // alignItems: 'center'
  }
});