import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Diceboard from './Diceboard';
import Players from './Players';
import Constants from 'expo-constants';
import { useState } from 'react';

export default function Main() {
  const [dices, setDices] = useState([0,0,0,0,0]);
  const [playerTurn, setPlayerTurn] = useState(1);
  const [diceState, setDiceState] = useState(true);
  const [diceTurn, setDiceTurn] = useState(3);

  const mainOptions = {
    dices: dices,
    setDices: setDices,
    playerTurn: playerTurn,
    setPlayerTurn: setPlayerTurn,
    diceState: diceState,
    setDiceState: setDiceState,
    diceTurn: diceTurn,
    setDiceTurn: setDiceTurn
  }

  return (
      <View style={styles.mainView}>
        <StatusBar hidden/>
        <View style={styles.container}>
          <Players mainOptions={mainOptions}/>
          <View style={{width: Constants.statusBarHeight, backgroundColor: 'black'}}/>
          <Diceboard mainOptions={mainOptions}/>
        </View>
      </View>
  );
}

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    padding: Constants.statusBarHeight,
    backgroundColor: 'blue'
  },
  container: {
    flex: 1,
    backgroundColor: 'red',
    flexDirection: 'row',
    justifyContent: 'space-around',
    // alignItems: 'center'
  }
});
