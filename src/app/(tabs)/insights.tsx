import ClearCompletedButton from "@/components/insight-screen/ClearCompletedButton";
import InsightsCategorySection from "@/components/insight-screen/InsightsCategorySection";
import InsightsPrioritySection from "@/components/insight-screen/InsightsPrioritySection";
import InsightsStatsSection from "@/components/insight-screen/InsightsStatsSection";
import UserProfile from "@/components/insight-screen/UserProfile";
import TabScreebBackground from "@/components/TabScreebBackground";
import React from "react";
import { ScrollView } from "react-native";

const InsightsScreen = () => {
  return (
    <ScrollView
      className="flex-1 bg-background py-4"
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ padding: 20, gap: 14 }}
      contentInsetAdjustmentBehavior="automatic"
    >
      <TabScreebBackground />

      <UserProfile />

      <InsightsStatsSection />
      <InsightsCategorySection />
      <InsightsPrioritySection />

      <ClearCompletedButton />
    </ScrollView>
  );
};

export default InsightsScreen;
