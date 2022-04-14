import React, { useState } from "react";
import { Button, StyleSheet, Text, View, Dimensions, TouchableOpacity } from "react-native";

export default function Setting(props: any) {
  const [clicked, setClicked] = useState(false);

  const clickHandler = () => {
    setClicked(!clicked);
  }

  if(!clicked){
    return(
      <View style={styles.button}>
        <TouchableOpacity
          onPress={clickHandler}
        >
          <Text>Pause</Text>
        </TouchableOpacity>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <Text>Setting</Text>
      <Button
        title="Go to Home"
        onPress={() => {}}
      />
      <Button
        title="Reset Game"
        onPress={() => {props.reset(); clickHandler();}}
      />
      <Button
        title="Close"
        onPress={() => {clickHandler()}}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 200,
    padding: 20,
    backgroundColor: "red",
    position: 'absolute',
    top: Dimensions.get('window').height / 2 - 100,
    left: Dimensions.get('window').width / 2 - 100,

    alignItems: 'center',
    borderStyle: 'solid',
    borderWidth: 3,
    borderColor: 'black',
    borderRadius: 5
  },
  button: {
    position: 'absolute',
    backgroundColor: "red",
    top: 20,
    right: 20,
    padding: 20,
    borderStyle: 'solid',
    borderWidth: 3,
    borderColor: 'black',
    borderRadius: 5
  }
});
