import { useGroceryStore } from "@/store/grocery-store";
import { Text, View } from "react-native";

// mapping UI label → key warna
const categoryKeyMap = {
  Alat: "Alat",
  "Komputer & Elektronik": "KomputerDanElektronik",
  Gadget: "Gadget",
  Snack: "Snack",
  "Makanan & Minuman": "MakananDanMinuman",
  "Buah & Sayur": "BuahDanSayur",
  "Daging & Protein": "DagingDanProtein",
  Aksesoris: "Aksesoris",
  Pakaian: "Pakaian",
  Kesehatan: "Kesehatan",
  Kebersihan: "Kebersihan",
  "Rumah Tangga": "RumahTangga",
  Edukasi: "Edukasi",
} as const;

const categoryColors: Record<string, string> = {
  Alat: "#a1887f",
  KomputerDanElektronik: "#64b5f6",
  Gadget: "#4dd0e1",
  Snack: "#ffb74d",
  MakananDanMinuman: "#ff8a65",
  BuahDanSayur: "#81c784",
  DagingDanProtein: "#e57373",
  Aksesoris: "#ba68c8",
  Pakaian: "#9575cd",
  Kesehatan: "#4db6ac",
  Kebersihan: "#aed581",
  RumahTangga: "#90a4ae",
  Edukasi: "#7986cb",
};

export default function InsightsCategorySection() {
  const { items } = useGroceryStore();
  const total = items.length;

  // ✅ tetap pakai label asli (tidak diubah)
  const categories = items.reduce<Record<string, number>>((acc, item) => {
    acc[item.category] = (acc[item.category] ?? 0) + 1;
    return acc;
  }, {});

  const categoryEntries = Object.entries(categories).sort(
    (a, b) => b[1] - a[1],
  );

  return (
    <View className="rounded-3xl border border-border bg-card p-4">
      <View className="flex-row items-center justify-between">
        <Text className="text-sm font-semibold text-foreground">
          Barang berdasarkan kategori
        </Text>
        <Text className="text-xs uppercase tracking-[1px] text-muted-foreground">
          {categoryEntries.length} groups
        </Text>
      </View>

      {categoryEntries.map(([category, count]) => {
        const widthPercent = total
          ? Math.max(10, Math.round((count / total) * 100))
          : 10;

        // 🔥 mapping ke key warna
        const key = categoryKeyMap[category as keyof typeof categoryKeyMap];

        return (
          <View key={category} className="mt-3">
            <View className="mb-1 flex-row items-center justify-between">
              <Text className="text-sm font-medium text-foreground">
                {category}
              </Text>
              <Text className="text-sm text-muted-foreground">{count}</Text>
            </View>

            <View className="overflow-hidden rounded-full bg-secondary">
              <View
                className="h-2 rounded-full"
                style={{
                  width: `${widthPercent}%` as `${number}%`,
                  backgroundColor: categoryColors[key] ?? "#8aa397", // fallback aman
                }}
              />
            </View>
          </View>
        );
      })}

      {categoryEntries.length === 0 ? (
        <View className="mt-3 rounded-2xl bg-muted px-4 py-3">
          <Text className="text-sm text-muted-foreground">
            Tambahkan item untuk melihat campuran kategori Anda.
          </Text>
        </View>
      ) : null}
    </View>
  );
}
