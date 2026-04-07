import { ClerkProvider } from "@clerk/expo";
import { tokenCache } from "@clerk/expo/token-cache";

import { Stack } from "expo-router";

import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useColorScheme } from "react-native";

import { KeyboardProvider } from "react-native-keyboard-controller";

import * as Sentry from "@sentry/react-native";

import "../../global.css";

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!;

if (!publishableKey) {
  throw new Error("Add your Clerk Publishable Key to the .env file");
}

Sentry.init({
  dsn: "https://93ad200d87b356d1ff99f446e47bc00c@o4509862801047552.ingest.us.sentry.io/4511176787427328",
  sendDefaultPii: true,
  enableLogs: false,
  integrations: [Sentry.feedbackIntegration()],
});

export default Sentry.wrap(function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
      <KeyboardProvider>
        <ThemeProvider
          value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
        >
          <Stack screenOptions={{ headerShown: false }} />
        </ThemeProvider>
      </KeyboardProvider>
    </ClerkProvider>
  );
});
