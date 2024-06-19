import PinpointDropdown from "@/components/Pinpoint/PinpointDropdown";
import { Link } from "expo-router";
import { useCallback, useReducer, useState } from "react";
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  Text,
  Pressable,
} from "react-native";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";

interface reducerState {
  revealed: number;
  guesses: string[];
  gameOver: boolean;
  solved: boolean;
}

interface reducerActionState {
  type: string;
  team?: string;
}

function createInitialState() {
  return {
    revealed: 1,
    guesses: [],
    gameOver: false,
    solved: false,
  };
}

function reducer(state: reducerState, action) {
  switch (action.type) {
    case "increment_revealed": {
      return {
        ...state,
        revealed: state.revealed + 1,
        guesses: [...state.guesses, action.team],
      };
    }
    case "game_over_solved": {
      return {
        ...state,
        revealed: 5,
        gameOver: true,
        solved: true,
      };
    }
    case "game_over_unsolved": {
      return {
        ...state,
        revealed: 5,
        gameOver: true,
        guesses: [...state.guesses, action.team],
      };
    }
  }
  throw Error("Unknown action: " + action.type);
}

export default function PinpointGame() {
  const [clues, setClues] = useState<string[]>([
    "Michael Bunting",
    "Noel Acciari",
    "John Tavares",
    "Mitch Marner",
    "Auston Matthews",
  ]);
  const [answer, setAnswer] = useState<string>("Toronto Maple Leafs");

  const [state, dispatch] = useReducer(reducer, null, createInitialState);

  const incrementRevealed = useCallback(
    (team: string) => {
      if (team == answer) {
        dispatch({
          type: "game_over_solved",
        });
      } else if (state.revealed + 1 == 5) {
        dispatch({
          type: "game_over_unsolved",
          team: team,
        });
      } else {
        dispatch({
          type: "increment_revealed",
          team: team,
        });
      }
    },
    [answer, state.revealed]
  );

  const renderClues = useCallback(
    (clue: string, index: number) => {
      return (
        <View key={`${clue}-${index}`} style={pinpointStyles.revealedClue}>
          {index < state.revealed && (
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
    [state.revealed]
  );
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View>
        <View style={pinpointStyles.clueContainer}>
          {clues.map(renderClues)}
        </View>
        {state.guesses.length > 0 && (
          <View style={pinpointStyles.guessContainer}>
            {state.guesses.map((team: string, index: number) => (
              <Text style={pinpointStyles.guess} key={index}>
                {team}
              </Text>
            ))}
          </View>
        )}
        <View>
          {!state.gameOver && (
            <PinpointDropdown incrementRevealed={incrementRevealed} />
          )}
        </View>
        <View>
          {state.gameOver && (
            <View>
              {state.solved && (
                <Text style={pinpointStyles.solved}>You solved it!</Text>
              )}
              {!state.solved && (
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
