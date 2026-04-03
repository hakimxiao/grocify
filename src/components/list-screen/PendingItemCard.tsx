import { GroceryItem, useGroceryStore } from "@/store/grocery-store";
import { FontAwesome } from "@expo/vector-icons";
import React from "react";
import { Pressable, Text, View } from "react-native";

const priorityPillBg = {
  rendah: "bg-priority-low",
  sedang: "bg-priority-medium",
  tinggi: "bg-priority-high",
};

const priorityPillText = {
  rendah: "text-priority-low-foreground",
  sedang: "text-priority-medium-foreground",
  tinggi: "text-priority-high-foreground",
};

const PendingItemCard = ({ item }: { item: GroceryItem }) => {
  const { removeItem, updateQuantity, togglePurchased } = useGroceryStore();

  return (
    <View className="rounded-3xl border border-border bg-card p-4">
      <View className="flex-row items-start gap-3">
        <Pressable
          className="mt-1 size-6 items-center justify-center rounded-full border-2 border-border bg-card"
          onPress={() => togglePurchased(item.id)}
        ></Pressable>

        <View className="flex-1">
          <View className="flex-row items-center justify-between gap-2">
            <Text className="flex-1 text-lg font-semibold text-card-foreground">
              {item.name}
            </Text>

            <View
              className={`rounded-full px-3 py-1 ${priorityPillBg[item.priority]}`}
            >
              <Text
                className={`text-xs font-bold uppercase ${priorityPillText[item.priority]}`}
              >
                {item.priority}
              </Text>
            </View>
          </View>

          <View className="mt-2 flex-row items-center gap-2">
            <View className="rounded-full bg-secondary px-3 py-1">
              <Text className="text-xs font-semibold text-secondary-foreground">
                {item.category}
              </Text>
            </View>
          </View>

          <View className="mt-3 flex-row items-center gap-2">
            <Pressable
              className="size-8 items-center justify-center rounded-xl border border-border bg-muted"
              onPress={() =>
                updateQuantity(item.id, Math.max(1, item.quantity - 1))
              }
            >
              <FontAwesome name="minus" size={12} color="#3b5a4a" />
            </Pressable>

            <Text className="min-w-9 text-center text-base font-semibold text-foreground">
              {item.quantity}
            </Text>

            <Pressable
              className="size-8 items-center justify-center rounded-xl border border-border bg-muted"
              onPress={() => updateQuantity(item.id, item.quantity + 1)}
            >
              <FontAwesome name="plus" size={12} color="#3b5a4a" />
            </Pressable>
          </View>
        </View>

        <Pressable
          className="size-9 items-center justify-center rounded-xl bg-destructive"
          onPress={() => removeItem(item.id)}
        >
          <FontAwesome name="trash" size={13} color="#d45f58" />
        </Pressable>
      </View>
    </View>
  );
};

export default PendingItemCard;
