import CompletedItems from "@/components/list-screen/CompletedItems";
import ListHeroCard from "@/components/list-screen/ListHeroCard";
import PendingItemCard from "@/components/list-screen/PendingItemCard";
import TabScreebBackground from "@/components/TabScreebBackground";
import { useGroceryStore } from "@/store/grocery-store";
import { FlatList, Text, View } from "react-native";

export default function ListScreen() {
  const { items } = useGroceryStore();

  const pendingItems = items.filter((item) => !item.purchased);

  return (
    <FlatList
      className="flex-1 bg-background"
      data={pendingItems}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <PendingItemCard item={item} />}
      contentContainerStyle={{ padding: 20, gap: 14 }}
      contentInsetAdjustmentBehavior="automatic"
      ListHeaderComponent={
        <View style={{ gap: 14 }}>
          <TabScreebBackground />
          <ListHeroCard />

          <View className="flex-row items-center justify-between px-1">
            <Text className="text-sm font-semibold uppercase tracking-[1px] text-muted-foreground">
              Shopping items
            </Text>
            <Text className="text-sm text-muted-foreground">
              {pendingItems.length} active
            </Text>
          </View>
        </View>
      }
      ListEmptyComponent={<Text>No Items In Database</Text>}
      ListFooterComponent={<CompletedItems />}
    />
  );
}

// FIRST VERSION WITH ITEMS.MAP
/**
 <ScrollView
      className="flex-1 bg-background py-4"
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ padding: 20, gap: 14 }}
    >
      <TabScreebBackground />

      <ListHeroCard />

      <View className="flex-row items-center justify-between px-1">
        <Text className="text-sm font-semibold uppercase tracking-[1px] text-muted-foreground">
          Shopping items
        </Text>
        <Text className="text-sm text-muted-foreground">
          {pendingItems.length} active
        </Text>
      </View>

      {pendingItems.map((item) => (
        <PendingItemCard key={item.id} item={item} />
      ))}

      <CompletedItems />
    </ScrollView>
 */
