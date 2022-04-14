import { Button, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Constants from 'expo-constants';
import { useEffect, useState } from 'react';

interface prop{
  mainOptions: any;
}

interface dice{
  value: number;
  hold: boolean;
}

const delay = (ms: number) => {
  const start = Date.now();
  while (Date.now() - start < ms);
}

export default function Diceboard(props: prop) {
  const [dices, setDices] = useState([0,0,0,0,0]);
  const [dice1, setDice1] = useState<dice>({value: 0, hold: false});
  const [dice2, setDice2] = useState<dice>({value: 0, hold: false});
  const [dice3, setDice3] = useState<dice>({value: 0, hold: false});
  const [dice4, setDice4] = useState<dice>({value: 0, hold: false});
  const [dice5, setDice5] = useState<dice>({value: 0, hold: false});

  const [state, setState] = useState(props.mainOptions.diceState);
  const [turn, setTurn] = useState(props.mainOptions.diceTurn);

  const [wait, setWait] = useState(false);

  const diceImgs = [
    require('./imgs/dice0.png'),
    require('./imgs/dice1.png'),
    require('./imgs/dice2.png'),
    require('./imgs/dice3.png'),
    require('./imgs/dice4.png'),
    require('./imgs/dice5.png'),
    require('./imgs/dice6.png')
  ]

  const initDices = () => {
    setDice1({value: 0, hold: false});
    setDice2({value: 0, hold: false});
    setDice3({value: 0, hold: false});
    setDice4({value: 0, hold: false});
    setDice5({value: 0, hold: false});
  }

  useEffect(() => {
    if(turn === 0){
      setWait(true);
      delay(1000);

      const delayRender = (dice: dice, setDice: any, count: number) => {
        setInterval(() => {
          const newDice = {...dice};
          newDice.hold = true;
          setDice(newDice);
        }, 100 * count);
      }

      // let count = 0;
      // if(!dice1.hold){
      //   delayRender(dice1, setDice1, count);
      //   count++;
      // }
      // if(!dice2.hold){
      //   delayRender(dice2, setDice2, count);
      //   count++;
      // }
      // if(!dice3.hold){
      //   delayRender(dice3, setDice3, count);
      //   count++;
      // }
      // if(!dice4.hold){
      //   delayRender(dice4, setDice4, count);
      //   count++;
      // }
      // if(!dice5.hold){
      //   delayRender(dice5, setDice5, count);
      //   count++;
      // }

      dice1.hold = true;
      dice2.hold = true;
      dice3.hold = true;
      dice4.hold = true;
      dice5.hold = true;

      setDice1(dice1);
      setDice2(dice2);
      setDice3(dice3);
      setDice4(dice4);
      setDice5(dice5);

      props.mainOptions.setDiceState(false);
      props.mainOptions.setDices(dices);
    }
    if(turn === 3){
      setWait(false);
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

  useEffect(() => {

  }, [props.mainOptions.dices]);

  const roll = () => {
    if(!props.mainOptions.diceState) return;
    if(wait) return;

    const newDice1 = {...dice1};
    const newDice2 = {...dice2};
    const newDice3 = {...dice3};
    const newDice4 = {...dice4};
    const newDice5 = {...dice5};

    if(!newDice1.hold) newDice1.value = Math.floor(Math.random() * 6) + 1;
    if(!newDice2.hold) newDice2.value = Math.floor(Math.random() * 6) + 1;
    if(!newDice3.hold) newDice3.value = Math.floor(Math.random() * 6) + 1;
    if(!newDice4.hold) newDice4.value = Math.floor(Math.random() * 6) + 1;
    if(!newDice5.hold) newDice5.value = Math.floor(Math.random() * 6) + 1;

    setTurn(turn - 1);

    setDice1(newDice1);
    setDice2(newDice2);
    setDice3(newDice3);
    setDice4(newDice4);
    setDice5(newDice5);

    setDices([newDice1.value, newDice2.value, newDice3.value, newDice4.value, newDice5.value]);
    props.mainOptions.setDices([newDice1.value, newDice2.value, newDice3.value, newDice4.value, newDice5.value]);
    props.mainOptions.setDiceTurn(turn - 1);
  }

  const holdDice = (dice: dice) => {
    if(wait) return dice;
    const newDice = {...dice};
    newDice.hold = !dice.hold;
    return newDice;
  }

  return (
    <View style={[styles.container, {backgroundColor: state ? "white" : "green"}]}>
      <View style={styles.header}>
        <Text style={{fontSize: 20}}>
          Player {props.mainOptions.playerTurn} 's Turn
        </Text>
      </View>
      <View style={[styles.diceArea]}>
        {
          dice1.hold ? 
          <View style={styles.dice}>
            <TouchableOpacity onPress={() => setDice1(holdDice(dice1))}>
              <Image style={styles.diceImg} source={diceImgs[dice1.value]}/>
            </TouchableOpacity>
          </View>
          : <View/>
        }
        {
          dice2.hold ?
          <View style={styles.dice}>
            <TouchableOpacity onPress={() => setDice2(holdDice(dice2))}>
              <Image style={styles.diceImg} source={diceImgs[dice2.value]}/>
            </TouchableOpacity>
          </View>
          : <View/>
        }
        {
          dice3.hold ?
          <View style={styles.dice}>
            <TouchableOpacity onPress={() => setDice3(holdDice(dice3))}>
              <Image style={styles.diceImg} source={diceImgs[dice3.value]}/>
            </TouchableOpacity>
          </View>
          : <View/>
        }
        {
          dice4.hold ?
          <View style={styles.dice}>
            <TouchableOpacity onPress={() => setDice4(holdDice(dice4))}>
              <Image style={styles.diceImg} source={diceImgs[dice4.value]}/>
            </TouchableOpacity>
          </View>
          : <View/>
        }
        {
          dice5.hold ?
          <View style={styles.dice}>
            <TouchableOpacity onPress={() => setDice5(holdDice(dice5))}>
              <Image style={styles.diceImg} source={diceImgs[dice5.value]}/>
            </TouchableOpacity>
          </View>
          : <View/>
        }
      </View>
      <View style={[styles.diceArea]}>
        {
          !dice1.hold ? 
          <View style={styles.dice}>
            <TouchableOpacity onPress={() => setDice1(holdDice(dice1))}>
              <Image style={styles.diceImg} source={diceImgs[dice1.value]}/>
            </TouchableOpacity>
          </View>
          : <View/>
        }
        {
          !dice2.hold ?
          <View style={styles.dice}>
            <TouchableOpacity onPress={() => setDice2(holdDice(dice2))}>
              <Image style={styles.diceImg} source={diceImgs[dice2.value]}/>
            </TouchableOpacity>
          </View>
          : <View/>
        }
        {
          !dice3.hold ?
          <View style={styles.dice}>
            <TouchableOpacity onPress={() => setDice3(holdDice(dice3))}>
              <Image style={styles.diceImg} source={diceImgs[dice3.value]}/>
            </TouchableOpacity>
          </View>
          : <View/>
        }
        {
          !dice4.hold ?
          <View style={styles.dice}>
            <TouchableOpacity onPress={() => setDice4(holdDice(dice4))}>
              <Image style={styles.diceImg} source={diceImgs[dice4.value]}/>
            </TouchableOpacity>
          </View>
          : <View/>
        }
        {
          !dice5.hold ?
          <View style={styles.dice}>
            <TouchableOpacity onPress={() => setDice5(holdDice(dice5))}>
              <Image style={styles.diceImg} source={diceImgs[dice5.value]}/>
            </TouchableOpacity>
          </View>
          : <View/>
        }
      </View>
      <TouchableOpacity style={styles.rollImg} onPress={roll}>
        <Image source={require('./imgs/diceroll.png')}/>
      </TouchableOpacity>
      {/* <Button title='Roll' onPress={roll}/> */}
      {/* <Text>{props.mainOptions.diceTurn}</Text> */}
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
  },
  dice: {

  },
  header : {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  diceImg: {
    width: 100,
  },
  diceArea: {
    flexDirection: 'row',
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rollImg: {
    alignSelf: 'center',
    // backgroundColor: 'black',
    borderStyle: 'solid',
    borderWidth: 5,
    borderColor: 'black',
    borderRadius: 5,
  }
});