import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Image,
} from "react-native";
import { router } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";

export default function Home() {
  return (
    <LinearGradient
      colors={["#2563EB", "#93C5FD", "#F5F7FA"]}
      style={styles.gradientContainer}
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.home}>
          <Image
            source={require("@/assets/images/logo.png")}
            style={styles.logoImage}
            resizeMode="contain"
          />

          <Text style={styles.title}>LOST & FOUND</Text>

          <Text style={styles.school}>SMKN 10 SURABAYA</Text>

          <Text style={styles.description}>
            Kehilangan barang atau menemukan barang milik orang lain?  
            Anda bisa menelusuri daftar barang temuan melalui foto yang tersedia, sekaligus melaporkan barang yang belum ditemukan.  
            Mari bersama membantu agar barang segera kembali ke pemiliknya.
          </Text>

          <TouchableOpacity
            style={styles.button}
            onPress={() => router.push("/barang")}
          >
            <Text style={styles.buttonText}>🔎 Lihat Barang Temuan</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => router.push("/laporan")}
          >
            <Text style={styles.buttonText}>📋 Laporkan Barang Hilang</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.adminButton}
            onPress={() => router.push("/login")}
          >
            <Text style={styles.adminText}>Login Admin</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradientContainer: {
    flex: 1,
  },

  container: {
    flex: 1,
    backgroundColor: "transparent",
  },

  home: {
    flex: 1,
    justifyContent: "center",
    padding: 25,
  },

  logoImage: {
    width: 90,
    height: 90,
    alignSelf: "center",
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
    color: "#4A5568",
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
    color: "#172B4D",
    fontWeight: "600",
  },
});