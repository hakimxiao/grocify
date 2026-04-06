import { useGroceryStore } from "@/store/grocery-store";
import React from "react";
import { Pressable, Text } from "react-native";

const ClearCompletedButton = () => {
  const { clearPurchased } = useGroceryStore();

  return (
    <Pressable className="rounded-2xl bg-primary py-3" onPress={clearPurchased}>
      <Text className="text-center text-base font-semibold text-primary-foreground">
        Bersihkan barang yang selesai
      </Text>
    </Pressable>
  );
};

export default ClearCompletedButton;
