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
    <SafeAreaView>
      <Text style={styles.title}>Pinpoint</Text>
      <PinpointGame />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  title: {
    textAlign: "center",
    fontWeight: "700",
    fontSize: 25,
    marginBottom: 10,
  },
});
