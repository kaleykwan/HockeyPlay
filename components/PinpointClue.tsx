import { View, Text, StyleSheet } from "react-native";

interface ClueParameters {
  revealed: boolean;
  name: string;
  isAnimated: boolean;
}

export default function PinpointClue({
  revealed,
  name,
  isAnimated,
}: ClueParameters) {
  if (revealed) {
    return (
      <View style={styles.revealedClue}>
        <Text style={styles.clue}>{name}</Text>
      </View>
    );
  } else {
    return <View style={styles.unrevealedClue}></View>;
  }
}

const styles = StyleSheet.create({
  clue: {
    textAlign: "center",
    fontWeight: "500",
    color: "white",
  },
  revealedClue: {
    backgroundColor: "#2a56eb",
    padding: "4%",
    margin: "4%",
    marginBottom: 0,
  },
  unrevealedClue: {
    backgroundColor: "#2a56eb",
    padding: "4%",
    margin: "4%",
    marginBottom: 0,
  },
});
