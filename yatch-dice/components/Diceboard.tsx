import { Button, StyleSheet, Text, View } from 'react-native';
import Constants from 'expo-constants';
import { useEffect, useState } from 'react';

interface prop{
  mainOptions: any;
}


export default function Diceboard(props: prop) {
  const [dices, setDices] = useState([0,0,0,0,0]);
  const [hold, setHold] = useState([false,false,false,false,false]);
  const [state, setState] = useState(props.mainOptions.diceState);
  const [turn, setTurn] = useState(props.mainOptions.diceTurn);

  const initDices = () => {
    setDices([0,0,0,0,0]);
    setHold([false,false,false,false,false]);
  }

  useEffect(() => {
    if(turn == 0){
      props.mainOptions.setDiceState(false);
    }
  }, [turn]);

  useEffect(() => {
    setState(props.mainOptions.diceState);
  }, [props.mainOptions.diceState]);

  useEffect(() => {
    setTurn(props.mainOptions.diceTurn);
    if(props.mainOptions.diceTurn === 3){
      initDices();
    }
  }, [props.mainOptions.diceTurn]);


  const roll = () => {
    if(!props.mainOptions.diceState) return;

    const newDices = [...dices];
    for (let i = 0; i < 5; i++) {
      if (!hold[i]) {
        newDices[i] = Math.floor(Math.random() * 6) + 1;
      }
    }
    setDices(newDices);
    setTurn(turn - 1);
    props.mainOptions.setDices(newDices);
    props.mainOptions.setDiceTurn(turn - 1);
  }

  const holdDice = (index: number) => {
    if(!props.mainOptions.diceState) return;
    if(dices[index] === 0) return;
    const newHold = [...hold];
    newHold[index] = !newHold[index];
    setHold(newHold);
  }


  return (
    <View style={[styles.container, {backgroundColor: state ? "white" : "green"}]}>
      {
        dices.map((dice, index) => {
          return (
            <View key={index}>
              <Text>{hold[index] ? '[' + dice + ']' : dice}</Text>
              <Button
                title={hold[index] ? 'Release' : 'Hold'}
                onPress={() => holdDice(index)}
              />
            </View>
          );
        })
      }
      <Button title='Roll' onPress={roll}/>
      {/* <Button title='Reset' onPress={initDices}/> */}
      <Text>{props.mainOptions.diceTurn}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'grey',
    // margin: Constants.statusBarHeight,
    borderRadius: Constants.statusBarHeight,
    padding: Constants.statusBarHeight,
    // margin: 10,

  }
});