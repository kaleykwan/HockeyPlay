import LoginStateProvider from "@/LoginStateProvider";
import { Slot } from "expo-router";

export default function RootLayout() {
  return (
    <LoginStateProvider>
      <Slot />
    </LoginStateProvider>
  );
}
