import { Link } from "expo-router";
import { SafeAreaView, Text, View, Pressable } from "react-native";

export default function Index() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Text
        style={{
          marginLeft: "10%",
          marginTop: "2%",
          fontSize: 25,
          fontWeight: 700,
        }}
      >
        Explore
      </Text>
      <View
        style={{
          flex: 1,
          alignItems: "center",
          margin: "10%",
          marginTop: "7%",
          backgroundColor: "white",
          borderRadius: 15
        }}
      >
        <Text>Pinpoint</Text>
        <Link href="/profile" asChild>
          <Pressable style={{backgroundColor: "black", padding: "4%", borderRadius: 10}}>
            <Text style={{color: "white"}}>Play</Text>
          </Pressable>
        </Link>
      </View>
    </SafeAreaView>
  );
}
