import React from "react";
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const Profile = () => {
  const user = {
    name: "Ibrahim gad",
    email: "Ibrahim.gad@gamil.com",
    phone: "+201234567890",
    location: "القاهرة، مصر",
    bio: "mobile developer with 3 years of experience",
    profilePicture: "https://randomuser.me/api/portraits/men/75.jpg",
    stats: {
      followers: 120,
      following: 180,
      posts: 4,
    },
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View style={styles.profileHeader}>
        <Image
          source={{ uri: user.profilePicture }}
          style={styles.profileImage}
        />
        <Text style={styles.name}>{user.name}</Text>
        <Text style={styles.email}>{user.email}</Text>
      </View>

      <View style={styles.statsRow}>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{user.stats.posts}</Text>
          <Text style={styles.statLabel}>Posts</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{user.stats.followers}</Text>
          <Text style={styles.statLabel}>المتابعين</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{user.stats.following}</Text>
          <Text style={styles.statLabel}>المتابَعون</Text>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>السيرة الذاتية</Text>
        <Text style={styles.cardText}>{user.bio}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>التفاصيل</Text>
        <Text style={styles.cardText}>📞 {user.phone}</Text>
        <Text style={styles.cardText}>📍 {user.location}</Text>
      </View>

      <TouchableOpacity style={styles.editButton}>
        <Text style={styles.editButtonText}>تعديل الملف الشخصي</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.logoutButton}>
        <Text style={styles.logoutButtonText}>تسجيل خروج</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1a202c", // تقريبا gray-900
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingVertical: 24,
  },
  profileHeader: {
    alignItems: "center",
    marginBottom: 32,
  },
  profileImage: {
    width: 128,
    height: 128,
    borderRadius: 64,
    borderWidth: 4,
    borderColor: "#4299e1", // blue-500
    marginBottom: 12,
  },
  name: {
    fontSize: 28,
    fontWeight: "bold",
    color: "white",
  },
  email: {
    marginTop: 4,
    color: "#a0aec0", // gray-400
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 32,
  },
  statItem: {
    alignItems: "center",
  },
  statNumber: {
    color: "#63b3ed", // blue-400
    fontSize: 22,
    fontWeight: "bold",
  },
  statLabel: {
    color: "#a0aec0",
  },
  card: {
    backgroundColor: "#2d3748", // gray-800
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 8,
    color: "#63b3ed", // blue-400
  },
  cardText: {
    color: "#e2e8f0", // gray-300
    lineHeight: 22,
  },
  editButton: {
    backgroundColor: "#3182ce", // blue-600
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 16,
  },
  editButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
  },
  logoutButton: {
    borderWidth: 2,
    borderColor: "#3182ce",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 90,
  },
  logoutButtonText: {
    color: "#3182ce",
    fontWeight: "bold",
    fontSize: 18,
  },
});

export default Profile;
