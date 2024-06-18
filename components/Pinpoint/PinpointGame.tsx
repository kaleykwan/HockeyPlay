import PinpointDropdown from "@/components/Pinpoint/PinpointDropdown";
import { Link } from "expo-router";
import { useCallback, useState } from "react";
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  Text,
  Pressable,
} from "react-native";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";

export default function PinpointGame() {
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

  // maybe useReducer
  const [gameStatus, setGameStatus] = useState<{
    answer: string;
    guesses: string[];
    gameOver: boolean;
    solved: boolean;
  }>({
    answer: "Toronto Maple Leafs",
    guesses: [],
    gameOver: false,
    solved: false,
  });

  const incrementRevealed = useCallback(
    (team: string) => {
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
    },
    [answer, revealed]
  );

  const renderClues = useCallback(
    (clue: string, index: number) => {
      return (
        <View key={`${clue}-${index}`} style={pinpointStyles.revealedClue}>
          {index < revealed && (
            <Animated.Text
              entering={FadeIn.duration(550)}
              exiting={FadeOut}
              style={pinpointStyles.clue}
            >
              {clue}
            </Animated.Text>
          )}
        </View>
      );
    },
    [revealed]
  );
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View>
        <View style={pinpointStyles.clueContainer}>
          {clues.map(renderClues)}
        </View>
        {guesses.length > 0 && (
          <View style={pinpointStyles.guessContainer}>
            {guesses.map((team: string, index: number) => (
              <Text style={pinpointStyles.guess} key={index}>
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
              {solved && (
                <Text style={pinpointStyles.solved}>You solved it!</Text>
              )}
              {!solved && (
                <Text style={pinpointStyles.solved}>Better luck tomorrow!</Text>
              )}
              <Text style={pinpointStyles.answerText}>Answer: {answer}</Text>
              <Link href="/" asChild>
                <Pressable style={pinpointStyles.playButton}>
                  <Text style={{ color: "white" }}>Back To Home</Text>
                </Pressable>
              </Link>
            </View>
          )}
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const pinpointStyles = StyleSheet.create({
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
});
