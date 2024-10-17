import { LoginStateContext } from "@/LoginStateProvider";
import { Redirect, Stack } from "expo-router";
import { useContext } from "react";

export default function AppLayout() {
  const { session } = useContext(LoginStateContext)!;

  if (!session) {
    // On web, static rendering will stop here as the user is not authenticated
    // in the headless Node process that the pages are rendered in.
    return <Redirect href="/signin" />;
  }

  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="pinpoint" options={{ headerShown: false }} />
    </Stack>
  );
}
