import LoginStateProvider from "@/LoginStateProvider";
import { getLocales } from "expo-localization";
import { Slot } from "expo-router";
import { createContext } from "react";

export const LocalDateContext = createContext("");

export default function RootLayout() {
  const localTimezone = getLocales();
  const date = new Date();
  const formattedDate = new Intl.DateTimeFormat(localTimezone[0].languageTag, {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(date);

  return (
    <LoginStateProvider>
      <LocalDateContext.Provider value={formattedDate}>
        <Slot />
      </LocalDateContext.Provider>
    </LoginStateProvider>
  );
}
