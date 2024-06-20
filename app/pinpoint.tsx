import PinpointGame from "@/components/Pinpoint/PinpointGame";
import { Link } from "expo-router";
import { useCallback, useState } from "react";
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
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.title}>Pinpoint</Text>
        <PinpointGame />
      </View>
      <View>
        <Link href="/" asChild>
          <Pressable style={styles.playButton}>
            <Text style={styles.buttonText}>Home</Text>
          </Pressable>
        </Link>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
    justifyContent: "space-between"
  },
  title: {
    textAlign: "center",
    fontWeight: "700",
    fontSize: 25,
    marginBottom: 10,
  },
  playButton: {
    backgroundColor: "black",
    padding: 10,
    borderRadius: 10,
    margin: 15,
    alignSelf: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "600"
  }
});
