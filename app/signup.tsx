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

  async function signInWithEmail() {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) Alert.alert(error.message);
    router.replace("/");
    setLoading(false);
  }

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
      />
      <TextInput
        onChangeText={(text) => setPassword(text)}
        value={password}
        secureTextEntry={true}
        placeholder="Password"
        autoCapitalize={"none"}
      />
      <Button
        title="Sign up"
        disabled={loading}
        onPress={() => signUpWithEmail()}
      />
      <Button
        title="Sign in"
        disabled={loading}
        onPress={() => signInWithEmail()}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
