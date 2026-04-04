import {
  GroceryCategory,
  GroceryPriority,
  useGroceryStore,
} from "@/store/grocery-store";
import { FontAwesome6 } from "@expo/vector-icons";
import { useState } from "react";
import { Alert, Pressable, Text, TextInput, View } from "react-native";

const categories: GroceryCategory[] = [
  "Alat",
  "Komputer & Elektronik",
  "Gadget",
  "Snack",
  "Makanan & Minuman",
  "Buah & Sayur",
  "Daging & Protein",
  "Aksesoris",
  "Pakaian",
  "Kesehatan",
  "Kebersihan",
  "Rumah Tangga",
  "Edukasi",
];

const priorities: GroceryPriority[] = ["rendah", "sedang", "tinggi"];

// 🔥 mapping UI label → key object
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

// 🔥 icon mapping (FontAwesome6)
const categoryIcons: Record<
  (typeof categoryKeyMap)[keyof typeof categoryKeyMap],
  string
> = {
  Alat: "hammer",
  KomputerDanElektronik: "computer",
  Gadget: "mobile-screen",
  Snack: "cookie-bite",
  MakananDanMinuman: "utensils",
  BuahDanSayur: "apple-whole",
  DagingDanProtein: "drumstick-bite",
  Aksesoris: "gem",
  Pakaian: "shirt",
  Kesehatan: "kit-medical",
  Kebersihan: "broom",
  RumahTangga: "house",
  Edukasi: "book",
};

const PlannerFormCard = () => {
  const { error, addItem } = useGroceryStore();

  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("1");
  const [category, setCategory] = useState<GroceryCategory>("Snack");
  const [priority, setPriority] = useState<GroceryPriority>("sedang");

  const canCreate = name.trim().length > 0;

  const handleQuantityChange = (value: string) => {
    setQuantity(value.replace(/[^0-9]/g, ""));
  };

  const createItem = async () => {
    await addItem({
      name: name.trim(),
      category,
      priority,
      quantity: Number(quantity),
    });

    Alert.alert("Success", "Item created successfully");

    // reset form
    setName("");
    setQuantity("1");
    setCategory("Snack");
    setPriority("sedang");
  };

  return (
    <View className="rounded-3xl border border-border bg-card p-4">
      {/* NAME */}
      <Text className="text-sm font-semibold text-foreground">Item name</Text>
      <View className="mt-2 flex-row items-center rounded-2xl border border-border bg-muted px-4 py-3">
        <FontAwesome6 name="bag-shopping" size={13} color="#5b7567" />

        <TextInput
          value={name}
          onChangeText={setName}
          placeholder="Ex: Almond panggang"
          className="ml-3 flex-1 text-base text-foreground"
          placeholderTextColor="#8aa397"
        />
      </View>

      {/* QUANTITY */}
      <Text className="mt-4 text-sm font-semibold text-foreground">
        Quantity
      </Text>
      <View className="mt-2 flex-row items-center rounded-2xl border border-border bg-muted px-4 py-3">
        <FontAwesome6 name="hashtag" size={13} color="#5b7567" />

        <TextInput
          value={quantity}
          onChangeText={handleQuantityChange}
          keyboardType="number-pad"
          placeholder="1"
          className="ml-3 flex-1 text-base text-foreground"
          placeholderTextColor="#8aa397"
        />
      </View>

      {/* CATEGORY */}
      <Text className="mt-4 text-sm font-semibold text-foreground">
        Category
      </Text>
      <View className="mt-2 flex-row flex-wrap gap-2">
        {categories.map((option) => {
          const active = option === category;
          const key = categoryKeyMap[option];
          const icon = categoryIcons[key];

          return (
            <Pressable
              key={option}
              onPress={() => setCategory(option)}
              className={`flex-row items-center rounded-full px-4 py-2 ${
                active ? "bg-primary" : "bg-secondary"
              }`}
            >
              <FontAwesome6
                name={icon}
                size={12}
                color={active ? "#fff" : "#486856"}
              />
              <Text
                className={`ml-2 text-sm font-semibold ${active ? "text-primary-foreground" : "text-secondary-foreground"}`}
              >
                {option}
              </Text>
            </Pressable>
          );
        })}
      </View>

      {/* PRIORITY */}
      <Text className="mt-4 text-sm font-semibold text-foreground">
        Priority
      </Text>
      <View className="mt-2 flex-row gap-2">
        {priorities.map((option) => {
          const active = option === priority;
          const icon =
            option === "tinggi"
              ? "bolt"
              : option === "sedang"
                ? "compass"
                : "seedling";

          return (
            <Pressable
              key={option}
              onPress={() => setPriority(option)}
              className={`flex-1 flex-row items-center justify-center gap-2 rounded-2xl py-2 ${active ? "bg-primary" : "bg-secondary"}`}
            >
              <FontAwesome6
                name={icon}
                size={12}
                color={active ? "#ffffff" : "#486856"}
              />
              <Text
                className={`mt-1 text-sm font-semibold capitalize ${active ? "text-primary-foreground" : "text-secondary-foreground"}`}
              >
                {option}
              </Text>
            </Pressable>
          );
        })}
      </View>

      <Pressable
        className={`mt-5 flex-row items-center justify-center rounded-2xl py-3 ${canCreate ? "bg-primary" : "bg-muted"}`}
        onPress={createItem}
        disabled={!canCreate}
      >
        <FontAwesome6
          name="plus"
          size={14}
          color={canCreate ? "#ffffff" : "#7a9386"}
        />
        <Text
          className={`ml-2 text-base font-semibold ${canCreate ? "text-primary-foreground" : "text-muted-foreground"}`}
        >
          Add to Grocery list
        </Text>
      </Pressable>

      {error ? (
        <View className="mt-3 rounded-2xl border border-destructive bg-destructive px-3 py-2">
          <Text className="text-sm text-destructive-foreground text-center uppercase">
            {error}
          </Text>
        </View>
      ) : null}
    </View>
  );
};

export default PlannerFormCard;
