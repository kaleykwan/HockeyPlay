import { Link } from "expo-router";
import { SafeAreaView, Text, View, Pressable, StyleSheet } from "react-native";

export default function Index() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Text style={styles.title}>Explore</Text>
      <View style={styles.gameCard}>
        <Text>Pinpoint</Text>
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
    margin: "10%",
    marginTop: "7%",
    backgroundColor: "white",
    borderRadius: 15,
  },
  playButton: {
    backgroundColor: "black",
    padding: "4%",
    borderRadius: 10,
  },
  title: {
    marginLeft: "10%",
    marginTop: "2%",
    fontSize: 25,
    fontWeight: "700",
  },
});
