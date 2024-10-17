import { Link } from "expo-router";
import {
  SafeAreaView,
  Text,
  View,
  Pressable,
  StyleSheet,
  FlatList,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const gameData = [
  {
    name: "Hockey Pinpoint",
    href: "/(app)/pinpoint",
    gradient: ["#68BBE3", "#0E86D4", "#03467F", "#003060"],
    description: "Guess the team these five players once played for"
  },
];

interface GameCardProps {
  name: string;
  href: string;
  gradient: string[];
}

const GameCard = ({ name, href, gradient }: GameCardProps) => {
  return (
    <LinearGradient colors={gradient} style={styles.gameCard}>
      <Text style={styles.gameTitle}>{name}</Text>
      {href && (
        <Link href={href} asChild>
          <Pressable style={styles.playButton}>
            <Text style={styles.playButtonText}>Play</Text>
          </Pressable>
        </Link>
      )}
      {!href && (
        <View style={styles.playButton}>
          <Text style={styles.playButtonText}>Coming Soon</Text>
        </View>
      )}
    </LinearGradient>
  );
};

export default function Index() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <View style={styles.home}>
        <Text style={styles.title}>Explore</Text>
        <FlatList
          data={gameData}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <GameCard
              name={item.name}
              href={item.href}
              gradient={item.gradient}
            />
          )}
          keyExtractor={(item) => item.name}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  home: {
    flex: 1,
    backgroundColor: "white",
    gap: 20,
  },
  gameCard: {
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: "#d1eaf6",
    borderRadius: 10,
    height: 200,
    marginBottom: 20,
    marginHorizontal: 30,
  },
  playButton: {
    backgroundColor: "white",
    alignSelf: "center",
    padding: 18,
    borderRadius: 25,
    width: "90%",
    marginBottom: 15,
  },
  playButtonText: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "500"
  },
  title: {
    fontSize: 25,
    fontWeight: "700",
    marginLeft: 30,
  },
  gameTitle: {
    fontSize: 25,
    fontWeight: "700",
    textAlign: "center",
    marginTop: 25,
  },
});
