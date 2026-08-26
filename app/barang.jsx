import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  Image,
} from "react-native";
import { router } from "expo-router";

const dataBarang = [
  {
    id: 1,
    nama: "Botol Minum",
    ciri: "Warna hitam dengan stiker anime",
    lokasi: "Lab RPL",
    gambar: require("../assets/images/botmin.jpg"),
  },
  {
    id: 2,
    nama: "Dompet",
    ciri: "Warna coklat",
    lokasi: "Kantin",
    gambar: require("../assets/images/Dompet.jpg"),
  },
  {
    id: 3,
    nama: "Jaket",
    ciri: "Warna hitam ukuran L",
    lokasi: "Lapangan",gambar: require("../assets/images/jaket.jpg"),

  },
];

export default function Barang() {
  return (
    <SafeAreaView style={styles.container}>

      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.back}>←</Text>
        </TouchableOpacity>

        <Text style={styles.headerTitle}>
          Barang Temuan
        </Text>
      </View>

      <FlatList
        data={dataBarang}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.list}

        renderItem={({ item }) => (
          <View style={styles.card}>

            <Image
                source={item.gambar}
                style={styles.foto}
            />

            <Text style={styles.nama}>
              {item.nama}
            </Text>

            <Text style={styles.label}>
              Ciri-ciri:
            </Text>

            <Text style={styles.text}>
              {item.ciri}
            </Text>

            <Text style={styles.label}>
              Lokasi ditemukan:
            </Text>

            <Text style={styles.text}>
              {item.lokasi}
            </Text>

          </View>
        )}
      />

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F7FA",
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    backgroundColor: "white",
  },

  back: {
    fontSize: 30,
    marginRight: 15,
  },

  headerTitle: {
    fontSize: 21,
    fontWeight: "bold",
    color: "#172B4D",
  },

  list: {
    padding: 15,
  },

  card: {
    backgroundColor: "white",
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,

    elevation: 3,
  },

  foto: {
    width: "100%",
    height: 500,
    borderRadius: 10,
    marginBottom: 15,
    resizeMode: "cover",
 },

  fotoText: {
    fontSize: 55,
  },

  nama: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#172B4D",
    marginBottom: 10,
  },

  label: {
    fontSize: 13,
    fontWeight: "bold",
    color: "#667085",
    marginTop: 5,
  },

  text: {
    fontSize: 15,
    color: "#344054",
    marginBottom: 5,
  },
});