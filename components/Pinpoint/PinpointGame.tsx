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
  Modal,
} from "react-native";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import FontAwesome from "react-native-vector-icons/FontAwesome";

interface reducerState {
  revealed: number;
  guesses: string[];
  gameOver: boolean;
  solved: boolean;
}

interface reducerActionState {
  type: string;
  team?: any;
}

function createInitialState() {
  return {
    revealed: 1,
    guesses: [],
    gameOver: false,
    solved: false,
  };
}

function reducer(state: reducerState, action: reducerActionState) {
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
      const baseColor = { r: 96, g: 77, b: 235 };
      const colorIncrement = 20;

      const backgroundColor = `rgb(
      ${Math.max(0, baseColor.r - colorIncrement * index)},
      ${Math.max(0, baseColor.g - colorIncrement * index)},
      ${Math.max(0, baseColor.b - colorIncrement * index)}
    )`;
      return (
        <View
          key={`${clue}-${index}`}
          style={[
            pinpointStyles.clueBox,
            {
              backgroundColor,
              borderTopRightRadius: index == 0 ? 5 : 0,
              borderTopLeftRadius: index == 0 ? 5 : 0,
              borderBottomRightRadius: index == 4 && !state.gameOver ? 5 : 0,
              borderBottomLeftRadius: index == 4 && !state.gameOver ? 5 : 0,
            },
          ]}
        >
          {index < state.revealed && (
            <Animated.Text
              entering={FadeIn.duration(550)}
              exiting={FadeOut}
              style={pinpointStyles.clue}
            >
              {clue}
            </Animated.Text>
          )}
          {index >= state.revealed && (
            <Animated.Text
              entering={FadeIn.duration(550)}
              exiting={FadeOut}
              style={pinpointStyles.clue}
            >
              Player {index + 1}
            </Animated.Text>
          )}
        </View>
      );
    },
    [state.revealed]
  );
  return (
    <View>
      <View style={{ marginBottom: state.gameOver ? 0 : 15 }}>
        {clues.map(renderClues)}
      </View>
      <View>
        {state.gameOver && (
          <View>
            <Animated.View
              entering={FadeIn.duration(550)}
              style={[
                pinpointStyles.answerContainer,
                {
                  borderTopRightRadius: state.gameOver ? 0 : 5,
                  borderTopLeftRadius: state.gameOver ? 0 : 5,
                },
              ]}
            >
              {state.solved && (
                <FontAwesome name="check-circle-o" color="white" size={20} />
              )}
              {!state.solved && (
                <FontAwesome name="times-circle-o" color="white" size={20} />
              )}
              <Text style={pinpointStyles.answerText}>{answer}</Text>
            </Animated.View>
          </View>
        )}
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
    </View>
  );
}

const pinpointStyles = StyleSheet.create({
  clue: {
    textAlign: "center",
    fontWeight: "500",
    color: "white",
  },
  clueBox: {
    padding: 20,
    marginHorizontal: 20,
  },
  solved: {
    textAlign: "center",
    fontWeight: "700",
    fontSize: 15,
  },
  answerText: {
    textAlign: "center",
    fontWeight: "600",
    fontSize: 15,
    color: "white",
  },
  answerContainer: {
    backgroundColor: "#7c6bff",
    marginHorizontal: 20,
    borderRadius: 5,
    padding: 20,
    marginBottom: 15,
    flexDirection: "row",
    justifyContent: "center",
    gap: 10,
  },
  clueContainer: {
    marginBottom: 15,
  },
  guessContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginHorizontal: 20,
    marginBottom: 15,
    padding: 15,
    borderWidth: 0.5,
    borderColor: "#e0e0e0",
    borderRadius: 5,
  },
  guess: {
    textDecorationLine: "line-through",
    textDecorationStyle: "solid",
    fontWeight: "500",
    marginRight: 8,
  },
});
