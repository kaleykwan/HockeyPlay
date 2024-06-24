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
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <View>
            <Text>Testing branch off of branch</Text>
            {/* <Text style={styles.title}>Pinpoint</Text> */}
            <PinpointGame />
          </View>
          <View>
            <Link href="/" asChild>
              <Pressable style={styles.playButton}>
                <Text style={styles.buttonText}>Home</Text>
              </Pressable>
            </Link>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
    justifyContent: "space-between",
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
    alignSelf: "center",
    marginBottom: 10,
  },
  buttonText: {
    color: "white",
    fontWeight: "600",
  },
});
