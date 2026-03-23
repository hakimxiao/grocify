import { Show } from "@clerk/expo";
import { AuthView, UserButton } from "@clerk/expo/native";
import { StyleSheet, Text, View } from "react-native";

export default function Index() {
  return (
    <View style={styles.container}>
      <Text className="text-4xl text-red-500">
        Edit src/app/index.tsx to edit this screen.
      </Text>

      <Show when="signed-in">
        <View
          style={{
            width: 36,
            height: 36,
            borderRadius: 18,
            overflow: "hidden",
          }}
        >
          <UserButton />
        </View>
      </Show>
      <Show when="signed-out">
        <AuthView />
      </Show>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
