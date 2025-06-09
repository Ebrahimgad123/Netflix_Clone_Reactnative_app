import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { Ionicons as IoIcon, Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import React from "react";
import { Image, ImageBackground, StyleSheet, Text, View } from "react-native";

type TabIconProps = {
  name: keyof typeof IoIcon.glyphMap;
  label: string;
  focused: boolean;
};

const TabIcon = ({ name, label, focused }: TabIconProps) => {
  const iconColor = focused ? "black" : "#B0B0B0";
  const textColor = focused ? "black" : "#B0B0B0";

  return focused ? (
    <ImageBackground
      source={images.highlight}
      resizeMode="cover"
      imageStyle={styles.bgImage}
      style={styles.bgImage}
    >
      <IoIcon name={name} size={22} color={iconColor} />
      <Text style={[styles.label, { color: textColor }]}>{label}</Text>
    </ImageBackground>
  ) : (
    <View style={styles.inactiveContainer}>
      <IoIcon name={name} size={22} color={iconColor} />
      <Text style={[styles.label, { color: textColor }]}>{label}</Text>
    </View>
  );
};

const _layout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: styles.tabBar,
        headerStyle: styles.header,
        headerTitleStyle: styles.headerTitle,
        headerTintColor: "white",
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Netflix Clone",
          
          headerLeft: () => (
           <Image source={icons.play} resizeMode="cover" style={{width: 30,marginLeft: 10, height: 30}} />
          ),
          headerRight: () => (
             <View style={{ marginRight: 15 }}>
              <View>
                <Ionicons name="notifications" size={27} color="white" />
                <View style={styles.headerBadge}>
                  <Text style={styles.headerBadgeText}>3</Text>
                </View>
              </View>
            </View>
          ),
         

          tabBarLabel: () => null,
          tabBarIcon: ({ focused }) => (
            <TabIcon name="home" label="Home" focused={focused} />
          ),
        }}
      />

      <Tabs.Screen
        name="search"
        options={{
          title: "Search",
          tabBarLabel: () => null,
          tabBarIcon: ({ focused }) => (
            <TabIcon name="search" label="Search" focused={focused} />
          ),
        }}
      />

      <Tabs.Screen
        name="saved"
        options={{
          title: "Saved Movies",
          tabBarLabel: () => null,
          tabBarIcon: ({ focused }) => (
            <TabIcon name="bookmark" label="Saved" focused={focused} />
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarLabel: () => null,
          tabBarIcon: ({ focused }) => (
            <TabIcon name="person" label="Profile" focused={focused} />
          ),
        }}
      />
    </Tabs>
  );
};

const styles = StyleSheet.create({
  bgImage: {
     borderRadius: 90,
    width: 80,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  inactiveContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: 70,
    height: 80,
    borderRadius: 50,
  },
  label: {
    fontSize: 12,
    fontWeight: "500",
    lineHeight: 16,
    textAlign: "center",
    marginTop: 4,
  },
  tabBar: {
    position: "absolute",
    bottom: 16,
    left: 16,
    right: 16,
    height: 60,
    backgroundColor: "#0f0D23",
    paddingBottom: 8,
    paddingTop: 10,
    borderRadius: 40,
    borderTopWidth: 0,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  header: {
    backgroundColor: "darkred",
  },
  headerTitle: {
    color: "white",
    fontWeight: "bold",
    fontSize: 20,
  },
  headerIconLeft: {
    marginLeft: 10,
  },
  headerIconRight: {
    marginRight: 30,
  },
  headerBadge: {
    position: "absolute",
    top: -4,
    right: -4,
    width: 20,
    height: 20,
    borderRadius: 8,
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
  },
  headerBadgeText: {
    color: "white",
    fontSize: 10,
    fontWeight: "bold",
  },
});

export default _layout;
