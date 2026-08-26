import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  SafeAreaView,
} from "react-native";
import { router } from "expo-router";

export default function Laporan() {
  const [nama, setNama] = useState("");
  const [nis, setNis] = useState("");
  const [kelas, setKelas] = useState("");
  const [barang, setBarang] = useState("");
  const [warna, setWarna] = useState("");
  const [ciri, setCiri] = useState("");
  const [lokasi, setLokasi] = useState("");

  const kirimLaporan = () => {
    if (
      nama === "" ||
      nis === "" ||
      kelas === "" ||
      barang === ""
    ) {
      Alert.alert(
        "Data belum lengkap",
        "Silakan isi data yang wajib."
      );

      return;
    }

    Alert.alert(
      "Berhasil",
      "Laporan barang hilang berhasil dikirim.",
      [
        {
          text: "OK",
          onPress: () => router.back(),
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>

      <ScrollView>

        <View style={styles.header}>

          <TouchableOpacity
            onPress={() => router.back()}
          >
            <Text style={styles.back}>←</Text>
          </TouchableOpacity>

          <Text style={styles.headerTitle}>
            Lapor Barang Hilang
          </Text>

        </View>

        <View style={styles.form}>

          <Text style={styles.sectionTitle}>
            Data Siswa
          </Text>

          <Text style={styles.label}>
            Nama Lengkap *
          </Text>

          <TextInput
            style={styles.input}
            placeholder="Masukkan nama"
            value={nama}
            onChangeText={setNama}
          />

          <Text style={styles.label}>
            NIS *
          </Text>

          <TextInput
            style={styles.input}
            placeholder="Masukkan NIS"
            keyboardType="numeric"
            value={nis}
            onChangeText={setNis}
          />

          <Text style={styles.label}>
            Kelas *
          </Text>

          <TextInput
            style={styles.input}
            placeholder="Contoh: XI RPL 3"
            value={kelas}
            onChangeText={setKelas}
          />

          <Text style={styles.sectionTitle}>
            Data Barang
          </Text>

          <Text style={styles.label}>
            Nama Barang *
          </Text>

          <TextInput
            style={styles.input}
            placeholder="Contoh: Dompet"
            value={barang}
            onChangeText={setBarang}
          />

          <Text style={styles.label}>
            Warna
          </Text>

          <TextInput
            style={styles.input}
            placeholder="Contoh: Hitam"
            value={warna}
            onChangeText={setWarna}
          />

          <Text style={styles.label}>
            Ciri-ciri Barang
          </Text>

          <TextInput
            style={[
              styles.input,
              styles.textArea,
            ]}
            placeholder="Jelaskan ciri-ciri barang"
            multiline
            value={ciri}
            onChangeText={setCiri}
          />

          <Text style={styles.label}>
            Lokasi Terakhir
          </Text>

          <TextInput
            style={styles.input}
            placeholder="Contoh: Lab RPL"
            value={lokasi}
            onChangeText={setLokasi}
          />

          <TouchableOpacity
            style={styles.button}
            onPress={kirimLaporan}
          >
            <Text style={styles.buttonText}>
              KIRIM LAPORAN
            </Text>
          </TouchableOpacity>

        </View>

      </ScrollView>

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
  },

  form: {
    padding: 20,
  },

  sectionTitle: {
    fontSize: 19,
    fontWeight: "bold",
    color: "#172B4D",
    marginTop: 10,
    marginBottom: 15,
  },

  label: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 7,
    color: "#344054",
  },

  input: {
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#D0D5DD",
    borderRadius: 10,
    padding: 13,
    fontSize: 15,
    marginBottom: 15,
  },

  textArea: {
    height: 100,
    textAlignVertical: "top",
  },

  button: {
    backgroundColor: "#2563EB",
    padding: 16,
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 30,
  },

  buttonText: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 15,
  },
});