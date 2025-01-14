import { supabase } from "@/supabase";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  View,
  TextInput,
  Pressable,
  Text,
  Button,
  Alert,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SignUp() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  async function signUpWithEmail() {
    setLoading(true);
    const {
      data: { session },
      error,
    } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (error) Alert.alert(error.message);
    if (!session)
      Alert.alert("Please check your inbox for email verification!");

    router.replace("/");
    setLoading(false);
  }
  return (
    <SafeAreaView>
      <TextInput
        onChangeText={(text) => setEmail(text)}
        value={email}
        placeholder="email@address.com"
        autoCapitalize={"none"}
        placeholderTextColor={"gray"}
        style={styles.input}
      />
      <TextInput
        onChangeText={(text) => setPassword(text)}
        value={password}
        secureTextEntry={true}
        placeholder="Password"
        autoCapitalize={"none"}
        placeholderTextColor={"gray"}
        style={styles.input}
      />
      <Pressable
        disabled={loading}
        onPress={() => signUpWithEmail()}
        style={styles.signUpButton}
      >
        <Text style={styles.signUpButtonText}>Sign Up</Text>
      </Pressable>
      <Pressable
        disabled={loading}
        onPress={() => router.replace("/signin")}
        style={styles.clickHereButton}
      >
        <Text style={styles.clickHereText}>Click here to sign up</Text>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  input: {
    marginLeft: 30,
    marginBottom: 15,
  },
  signUpButton: {
    backgroundColor: "#412fb5",
    padding: 10,
    alignSelf: "center",
    borderRadius: 10,
  },
  signUpButtonText: {
    color: "white",
  },
  clickHereButton: {
    alignSelf: "center",
    marginTop: 15,
  },
  clickHereText: {
    color: "#4093ff",
  },
});
