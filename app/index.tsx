import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { router } from "expo-router";

export default function Home() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.home}>
        <Text style={styles.logo}>🔎</Text>

        <Text style={styles.title}>
          LOST & FOUND
        </Text>

        <Text style={styles.school}>
          SMKN 10 SURABAYA
        </Text>

        <Text style={styles.description}>
          Website sederhana untuk membantu siswa
          menemukan kembali barang yang hilang
          di lingkungan sekolah.
        </Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push("/barang")}
        >
          <Text style={styles.buttonText}>
            🔎 Lihat Barang Temuan
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push("/laporan")}
        >
          <Text style={styles.buttonText}>
            📋 Laporkan Barang Hilang
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.adminButton}
          onPress={() => router.push("/login")}
        >
          <Text style={styles.adminText}>
            Login Admin
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F7FA",
  },

  home: {
    flex: 1,
    justifyContent: "center",
    padding: 25,
  },

  logo: {
    fontSize: 60,
    textAlign: "center",
    marginBottom: 15,
  },

  title: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    color: "#172B4D",
  },

  school: {
    fontSize: 17,
    fontWeight: "600",
    textAlign: "center",
    marginTop: 5,
    color: "#4A5568",
  },

  description: {
    fontSize: 15,
    textAlign: "center",
    lineHeight: 23,
    marginVertical: 30,
    color: "#667085",
  },

  button: {
    backgroundColor: "#2563EB",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },

  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },

  adminButton: {
    marginTop: 15,
    padding: 12,
  },

  adminText: {
    textAlign: "center",
    color: "#2563EB",
    fontWeight: "600",
  },
});