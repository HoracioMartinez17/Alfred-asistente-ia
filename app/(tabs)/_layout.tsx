import React from "react";
import { Tabs } from "expo-router";
import { View, StyleSheet, Pressable, Text } from "react-native";
import { COLORS } from "@/shared/utils/constants";

const TabBar = (props: any) => {
  const { state, descriptors, navigation } = props;

  return (
    <View style={styles.tabBar}>
      {state.routes.map((route: any, index: number) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
              ? options.title
              : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const icon = index === 0 ? "🤖" : "⚙️";

        return (
          <View key={route.key} style={[styles.tab, isFocused && styles.tabFocused]}>
            <Pressable onPress={onPress} style={styles.tabButton}>
              <Text style={styles.icon}>{icon}</Text>
              <Text style={[styles.label, isFocused && styles.labelFocused]}>
                {label}
              </Text>
            </Pressable>
          </View>
        );
      })}
    </View>
  );
};

export default function TabLayout() {
  return (
    <Tabs
      tabBar={TabBar}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Agent",
          tabBarLabel: "Agent",
        }}
      />
      <Tabs.Screen
        name="integrations"
        options={{
          title: "Integrations",
          tabBarLabel: "Integrations",
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: "row",
    backgroundColor: COLORS.dark.surface,
    borderTopWidth: 1,
    borderTopColor: COLORS.dark.border,
    paddingHorizontal: 0,
  },

  tab: {
    flex: 1,
    paddingHorizontal: 12,
    paddingVertical: 12,
    justifyContent: "center",
    alignItems: "center",
    borderTopWidth: 2,
    borderTopColor: "transparent",
  },

  tabFocused: {
    borderTopColor: COLORS.primary,
    backgroundColor: "rgba(45, 107, 255, 0.05)",
  },

  tabButton: {
    alignItems: "center",
    justifyContent: "center",
  },

  icon: {
    fontSize: 24,
    marginBottom: 4,
  },

  label: {
    fontSize: 12,
    color: COLORS.dark.textSecondary,
    fontWeight: "500",
  },

  labelFocused: {
    color: COLORS.primary,
    fontWeight: "600",
  },
});
