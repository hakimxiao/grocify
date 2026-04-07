import PlannerFormCard from "@/components/planner-screen/PlannerFormCard";
import PlannerHeroImage from "@/components/planner-screen/PlannerHeroImage";
import TabScreebBackground from "@/components/TabScreebBackground";
import { useGroceryStore } from "@/store/grocery-store";
import { FontAwesome6 } from "@expo/vector-icons";
import { Platform, Text, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";

const PlannerScreen = () => {
  const isAndroid = Platform.OS === "android";

  const { items } = useGroceryStore();

  const pendingCount = items.filter((item) => !item.purchased).length;
  const highPriorityCount = items.filter(
    (item) => !item.purchased && item.priority == "tinggi",
  ).length;

  const totalQuantity = items
    .filter((item) => !item.purchased)
    .reduce((sum, item) => sum + item.quantity, 0);

  return (
    <KeyboardAwareScrollView
      bottomOffset={80}
      contentContainerStyle={{ padding: 20, gap: 14 }}
      showsVerticalScrollIndicator={false}
      className="flex-1 bg-background py-4"
      contentInsetAdjustmentBehavior="automatic"
      keyboardShouldPersistTaps="handled"
    >
      <TabScreebBackground />

      <View
        className={`gap-4 rounded-3xl border border-border bg-card/70 p-5 ${isAndroid ? "mt-14" : ""}`}
      >
        <View className="flex-row items-start justify-between">
          <View className="flex-row items-start justify-between">
            <View className="flex-1 pr-4">
              <Text className="text-xs font-semibold uppercase tracking-[1.2px] text-muted-foreground">
                Perencana belanjaan
              </Text>
              <Text className="mt-1 text-[25px] font-bold leading-9 text-foreground font-serif">
                Rencanakan dengan lebih cerdas, belanja dengan lebih bahagia.
              </Text>
              <Text className="mt-2 text-sm leading-5 text-muted-foreground">
                Atur belanjaan Anda berikutnya dengan kategori, jumlah, dan
                prioritas di satu tempat.
              </Text>
            </View>

            <View className="size-12 items-center justify-center rounded-2xl bg-primary">
              <FontAwesome6
                name="wand-magic-sparkles"
                size={18}
                color="#ffffff"
              />
            </View>
          </View>
        </View>

        <View className="flex-row gap-2">
          <View className="flex-1 rounded-2xl border border-border bg-background/80 p-3">
            <Text className="text-xs font-medium uppercase tracking-[1px] text-muted-foreground">
              Tertunda
            </Text>
            <Text className="mt-1 text-xl font-bold text-foreground">
              {pendingCount}
            </Text>
          </View>

          <View className="flex-1 rounded-2xl border border-border bg-background/80 p-3">
            <Text className="text-xs font-medium uppercase tracking-[1px] text-muted-foreground">
              Prioritas Tinggi
            </Text>
            <Text className="mt-1 text-xl font-bold text-foreground">
              {highPriorityCount}
            </Text>
          </View>

          <View className="flex-1 rounded-2xl border border-border bg-background/80 p-3">
            <Text className="text-xs font-medium uppercase tracking-[1px] text-muted-foreground">
              Units
            </Text>
            <Text className="mt-1 text-xl font-bold text-foreground">
              {totalQuantity}
            </Text>
          </View>
        </View>
      </View>

      <PlannerHeroImage />

      <View className="px-1">
        <Text className="text-sm font-semibold uppercase tracking-[1px] text-muted-foreground">
          Bangun daftar Anda
        </Text>
        <Text className="mt-1 text-sm text-muted-foreground">
          Tambahkan item dengan jumlah, kategori, dan tingkat urgensi yang
          tepat.
        </Text>
      </View>

      <PlannerFormCard />
    </KeyboardAwareScrollView>
  );
};

export default PlannerScreen;
