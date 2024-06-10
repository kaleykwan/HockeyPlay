import { Link } from "expo-router";
import { SafeAreaView, Text, View, Pressable, StyleSheet } from "react-native";

export default function Index() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Text style={styles.title}>Explore</Text>
      <View style={styles.gameCard}>
        <Text style={styles.gameTitle}>Pinpoint</Text>
        <Link href="/pinpoint" asChild>
          <Pressable style={styles.playButton}>
            <Text style={{ color: "white" }}>Play</Text>
          </Pressable>
        </Link>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  gameCard: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    margin: "9%",
    marginTop: "7%",
    backgroundColor: "white",
    borderRadius: 15,
  },
  playButton: {
    backgroundColor: "black",
    padding: "4%",
    borderRadius: 10,
    margin: "4%"
  },
  title: {
    marginLeft: "9%",
    marginTop: "2%",
    fontSize: 25,
    fontWeight: "700",
  },
  gameTitle: {
    fontSize: 23,
    fontWeight: "700",
    marginTop: "4%"
  }
});
