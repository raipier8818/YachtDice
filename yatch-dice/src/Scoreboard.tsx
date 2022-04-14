import { useEffect, useState } from 'react';
import { Button, FlatList, ListViewBase, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Players from './Players';

interface prop {
  options: any;
  name: string;
  id: number;
};

interface score{
  name: string;
  score: number;
  expected: number;
  checked: boolean;
  idx: number;
};

export default function Scoreboard(props: prop) {
  var data = [
    {name: "Ones", score: 0, expected: 0, checked: false, idx: 0},
    {name: "Twos", score: 0, expected: 0, checked: false, idx: 1},
    {name: "Threes", score: 0, expected: 0, checked: false, idx: 2},
    {name: "Fours", score: 0, expected: 0, checked: false, idx: 3},
    {name: "Fives", score: 0, expected: 0, checked: false, idx: 4},
    {name: "Sixes", score: 0, expected: 0, checked: false, idx: 5},
    {name: "Bonus", score: 0, expected: 0, checked: false, idx: 6},
    {name: "Chance", score: 0, expected: 0, checked: false, idx: 7},
    {name: "Four of a kind", score: 0, expected: 0, checked: false, idx: 8},
    {name: "Full house", score: 0, expected: 0, checked: false, idx: 9},
    {name: "Small straight", score: 0, expected: 0, checked: false, idx: 10},
    {name: "Large straight", score: 0, expected: 0, checked: false, idx: 11},
    {name: "Yacht", score: 0, expected: 0, checked: false, idx: 12},
    {name: "Total", score: 0, expected: 0, checked: true, idx: 13},
  ];

  const [scores, setScores] = useState<score[]>(data);
  const [turn, setTurn] = useState(props.id == props.options.playerTurn);
  const [dices, setDices] = useState(props.options.dices);
  // console.log(turn);

  const initScoreBoard = () => {
    setScores(data);
    setTurn(props.id == props.options.playerTurn);
  }
    
  useEffect(() => {
    if(props.options.reset){
      initScoreBoard();
      props.options.setReset(false);
    }
  }, [props.options.reset])

  useEffect(() => { 
    setDices(props.options.dices);
    onExpectedScore(props.options.dices);
  }, [props.options.dices]);

  useEffect(() => {
    setTurn(props.id == props.options.playerTurn);
  }, [props.options.playerTurn]);

  const renderScore = ({item}:any) => {
    // console.log(item);
    
    if(item.idx == 6 || item.idx == 13){
      return (
        <View style={[styles.scoreArea]}>
          <Text style={styles.scoreText}>{item.name}</Text>
          {
            item.checked ? 
            <Text style={styles.scoreText}>{item.score}</Text> : 
            <Text style={styles.scoreText}>{item.expected}</Text>
          }
        </View>
      )
    }else{
      return (
        <TouchableOpacity style={[styles.scoreArea, item.checked ? styles.scoreCheckedArea : {}]} onPress={() => {checkScore(item.idx)}}>
          <Text style={styles.scoreText}>{item.name}</Text>
          {
            item.checked ? 
            <Text style={styles.scoreText}>{item.score}</Text> : 
            <Text style={styles.scoreText}>{item.expected}</Text>
          }
        </TouchableOpacity>
      );  
    }
  }

  const onExpectedScore = (dices: number[]) => {
    if(!turn) return;
    var newScores = scores;
    var dicesfilter = [
      dices.filter(x => x === 1).length,
      dices.filter(x => x === 2).length,
      dices.filter(x => x === 3).length,
      dices.filter(x => x === 4).length,
      dices.filter(x => x === 5).length,
      dices.filter(x => x === 6).length,
    ];    

    newScores[0].expected = dicesfilter[0] * 1;
    newScores[1].expected = dicesfilter[1] * 2;
    newScores[2].expected = dicesfilter[2] * 3;
    newScores[3].expected = dicesfilter[3] * 4;
    newScores[4].expected = dicesfilter[4] * 5;
    newScores[5].expected = dicesfilter[5] * 6;
    
    var sum = dices.reduce((a, b) => a + b, 0);
    newScores[7].expected = sum;
    newScores[8].expected = dicesfilter.filter(x => x >= 4).length === 1 ? sum : 0;
    newScores[9].expected = dicesfilter.filter(x => x === 3).length === 1 && dicesfilter.filter(x => x === 2).length === 2 ? sum : 0;
    newScores[10].expected = dicesfilter.reduce((a, b) => (b >= 1 ? a + 1 : 0), 0) === 4 ? 15 : 0;
    newScores[11].expected = dicesfilter.reduce((a, b) => (b >= 1 ? a + 1 : 0), 0) === 5 ? 30 : 0;
    newScores[12].expected = dicesfilter.filter(x => x === 5).length === 1 ? 50 : 0;
    // console.log(dicesfilter.filter(x => x === 1).length);
    
    setScores(newScores);
  }

  const offExpectedScore = () => {
    var newScores = scores;
    newScores.forEach(x => {
      x.expected = 0;
    });
    setScores(newScores);
  }

  const checkScore = (idx: number) => {
    if(!turn) return;
    if(scores[idx].checked) return;
    if(props.options.diceTurn === 3) return;

    var newScores = scores;
    newScores[idx].checked = true;
    newScores[idx].score = newScores[idx].expected;
    
    if(!newScores[6].checked && scores[0].score + scores[1].score + scores[2].score + scores[3].score + scores[4].score + scores[5].score >= 63){
      newScores[6].score = 35;
      newScores[6].checked = true;
    }

    var total = 0;
    for(var i = 0; i < newScores.length - 1; i++){
      total += newScores[i].score;
    }
    newScores[13].score = total;

    offExpectedScore();
    setScores(newScores);
    endTurn();
  }

  const endTurn = () => {
    if(!turn) return;
    props.options.setPlayerTurn(props.id == 1 ? 2 : 1);
    props.options.setDiceTurn(3);
    props.options.setDiceState(true);
    setTurn(false);
  }

  return (
    <View style={[styles.scoreboardArea, {backgroundColor: turn ? "white" : 'green'}]} >
      <Text style={styles.scoreboardText}>{props.name}</Text>
      <FlatList
        scrollEnabled={false}
        data={scores}
        renderItem={renderScore}
      />
      {/* <Button title="End" onPress={endTurn}/> */}
    </View>
  );
}

const styles = StyleSheet.create({
  scoreboardArea: {
    flex: 1,
    backgroundColor: 'green',
    margin: 10,
    padding: 10,
    borderRadius: 10,
  },
  scoreboardText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  scoreArea: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  scoreCheckedArea: {
    backgroundColor: 'grey',
  },
  scoreText: {
    fontSize: 18,
  },
});