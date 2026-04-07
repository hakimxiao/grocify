import { useGroceryStore } from "@/store/grocery-store";
import React from "react";
import { Platform, Text, View } from "react-native";

const ListHeroCard = () => {
  const { items } = useGroceryStore();

  const completedCount = items.filter((item) => item.purchased).length;
  const pendingCount = items.length - completedCount;
  const completionRate = items.length
    ? Math.round((completedCount / items.length) * 100)
    : 0;

  return (
    <View
      className={`${Platform.OS === "android" ? "rounded-3xl bg-primary p-5 mt-[45px]" : "rounded-3xl bg-primary p-5"}`}
    >
      <Text className="text-sm font-semibold uppercase tracking-[1px] text-primary-foreground/70">
        Hari ini
      </Text>

      <Text className="mt-1 text-3xl font-extrabold text-primary-foreground">
        Papan belanja anda
      </Text>

      <Text className="mt-1 text-sm text-primary-foreground/80">
        {pendingCount} tertunda • {completedCount} selesai
      </Text>

      <View className="mt-4 overflow-hidden rounded-full bg-white/50">
        <View
          className="h-2 rounded-full bg-secondary"
          style={{ width: `${completionRate}%` }}
        />
      </View>
    </View>
  );
};

export default ListHeroCard;
