import { useAuth } from "@clerk/expo";
import { Redirect, Stack } from "expo-router";

export default function TabsRoutesLayout() {
  const { isSignedIn, isLoaded } = useAuth();

  if (!isLoaded) {
    return null;
  }

  if (!isSignedIn) {
    return <Redirect href={"/(auth)/sign-in"} />;
  }

  return <Stack />;
}
