import PinpointClue from "@/components/PinpointClue";
import PinpointDropdown from "@/components/PinpointDropdown";
import { Link } from "expo-router";
import { useState } from "react";
import {
  SafeAreaView,
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  Text,
  Pressable,
} from "react-native";

export default function Pinpoint() {
  const [clues, setClues] = useState<string[]>([
    "Michael Bunting",
    "Noel Acciari",
    "John Tavares",
    "Mitch Marner",
    "Auston Matthews",
  ]);
  const [answer, setAnswer] = useState<string>("Toronto Maple Leafs");
  const [revealed, setRevealed] = useState<number>(1);
  const [guesses, setGuesses] = useState<string[]>([]);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [solved, setSolved] = useState<boolean>(false);

  function incrementRevealed(team: string) {
    if (team == answer) {
      setGameOver(true);
      setSolved(true);
      setRevealed(5);
    } else {
      setRevealed((prev) => prev + 1);
      setGuesses((prev) => [...prev, team]);
      if (revealed == 4) {
        setGameOver(true);
      }
    }
  }

  return (
    <SafeAreaView>
      <Text style={styles.title}>Pinpoint</Text>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View>
          <View style={styles.clueContainer}>
            {clues.map((clue: string, index: number) => (
              <PinpointClue
                key={index}
                revealed={index < revealed ? true : false}
                name={clue}
                isAnimated={index == revealed - 1}
              />
            ))}
          </View>
          {guesses.length > 0 && (
            <View style={styles.guessContainer}>
              {guesses.map((team: string, index: number) => (
                <Text style={styles.guess} key={index}>
                  {team}
                </Text>
              ))}
            </View>
          )}
          <View>
            {!gameOver && (
              <PinpointDropdown incrementRevealed={incrementRevealed} />
            )}
          </View>
          <View>
            {gameOver && (
              <View>
                {solved && <Text style={styles.solved}>You solved it!</Text>}
                {!solved && <Text style={styles.solved}>Better luck tomorrow!</Text>}
                <Text style={styles.answerText}>Answer: {answer}</Text>
                <Link href="/" asChild>
                  <Pressable style={styles.playButton}>
                    <Text style={{ color: "white" }}>Back To Home</Text>
                  </Pressable>
                </Link>
              </View>
            )}
          </View>
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  title: {
    textAlign: "center",
    fontWeight: "700",
    fontSize: 25,
    marginBottom: 15,
  },
  clueContainer: {
    marginBottom: "4%",
  },
  guessContainer: {
    marginHorizontal: "4%",
    marginBottom: "4%",
  },
  guess: {
    textDecorationLine: "line-through",
    textDecorationStyle: "solid",
    fontWeight: "500",
  },
  playButton: {
    backgroundColor: "black",
    padding: "4%",
    borderRadius: 10,
    margin: "4%",
  },
  solved: {
    textAlign: "center",
    fontWeight: "700",
    fontSize: 20,
  },
  answerText: {
    textAlign: "center",
    fontWeight: "600",
    fontSize: 15,
  },
});
