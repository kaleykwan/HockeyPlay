import { supabase } from "@/supabase";
import { Pressable, SafeAreaView, Text, View, StyleSheet } from "react-native";

export default function Profile() {
  async function signOut() {
    const { error } = await supabase.auth.signOut();
  }
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <Text style={styles.title}>Profile</Text>
      <Pressable style={styles.signOutButton} onPress={signOut}>
        <Text style={{ color: "white" }}>Sign Out</Text>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  signOutButton: {
    backgroundColor: "black",
    padding: 20,
    borderRadius: 10,
    margin: 20,
    alignSelf: "center",
  },
  title: {
    marginLeft: 35,
    marginTop: 15,
    fontSize: 25,
    fontWeight: "700",
  },
});
