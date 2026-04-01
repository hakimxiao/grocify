import { useGroceryStore } from "@/store/grocery-store";
import { useAuth } from "@clerk/expo";
import { Redirect } from "expo-router";
import { NativeTabs } from "expo-router/unstable-native-tabs";
import { useColorScheme } from "nativewind";
import { useEffect } from "react";

export default function TabsLayout() {
  const { isSignedIn, isLoaded } = useAuth();

  const { loadItems, items } = useGroceryStore();

  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === "dark";
  const tabTintColor = isDark ? "hsl(142, 70%, 54%)" : "hsl(147, 75%, 33%";

  useEffect(() => {
    loadItems();
  }, []);

  console.log("⭐ Items:", items);

  if (!isLoaded) {
    return null;
  }

  if (!isSignedIn) {
    return <Redirect href={"/(auth)/sign-in"} />;
  }

  return (
    <NativeTabs tintColor={tabTintColor}>
      <NativeTabs.Trigger name="index">
        <NativeTabs.Trigger.Label>Home</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon
          sf={{
            default: "list.bullet.clipboard",
            selected: "list.bullet.clipboard.fill",
          }}
          md="list_alt"
        />
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="planner">
        <NativeTabs.Trigger.Label>Planner</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon
          sf={{
            default: "plus.circle",
            selected: "pills.circle.fill",
          }}
          md="add_circle"
        />
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="insights">
        <NativeTabs.Trigger.Label>Insights</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon
          sf={{
            default: "chart.bar",
            selected: "chart.bar.fill",
          }}
          md="analytics"
        />
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
