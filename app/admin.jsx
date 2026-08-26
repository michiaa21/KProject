import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  FlatList,
  Alert,
  Modal,
  SafeAreaView,
  ScrollView,
} from "react-native";

export default function Admin({
  barang,
  arsip,
  kembali,
  tambahBarang,
  editBarang,
  barangTerambil,
}) {
  const [modal, setModal] = useState(null);

  const [nama, setNama] = useState("");
  const [ciri, setCiri] = useState("");
  const [lokasi, setLokasi] = useState("");

  const [barangDipilih, setBarangDipilih] =
    useState(null);

  const [namaPengambil, setNamaPengambil] =
    useState("");
  const [nisPengambil, setNisPengambil] =
    useState("");
  const [kelasPengambil, setKelasPengambil] =
    useState("");

  // =========================
  // RESET FORM
  // =========================
  const resetForm = () => {
    setNama("");
    setCiri("");
    setLokasi("");
    setBarangDipilih(null);

    setNamaPengambil("");
    setNisPengambil("");
    setKelasPengambil("");

    setModal(null);
  };

  // =========================
  // TAMBAH
  // =========================
  const simpanTambah = () => {
    if (!nama || !ciri || !lokasi) {
      Alert.alert(
        "Data belum lengkap",
        "Isi semua data barang."
      );
      return;
    }

    tambahBarang({
      nama,
      ciri,
      lokasi,
    });

    resetForm();
  };

  // =========================
  // EDIT
  // =========================
  const bukaEdit = (item) => {
    setBarangDipilih(item);

    setNama(item.nama);
    setCiri(item.ciri);
    setLokasi(item.lokasi);

    setModal("edit");
  };

  const simpanEdit = () => {
    if (!barangDipilih) return;

    editBarang(barangDipilih.id, {
      nama,
      ciri,
      lokasi,
    });

    resetForm();
  };

  // =========================
  // TERAMBIL
  // =========================
  const bukaTerambil = (item) => {
    setBarangDipilih(item);
    setModal("terambil");
  };

  const simpanTerambil = () => {
    if (
      !namaPengambil ||
      !nisPengambil ||
      !kelasPengambil
    ) {
      Alert.alert(
        "Data belum lengkap",
        "Isi identitas pengambil."
      );
      return;
    }

    barangTerambil(barangDipilih.id, {
      nama: namaPengambil,
      nis: nisPengambil,
      kelas: kelasPengambil,
    });

    resetForm();
  };

  // =========================
  // CARD BARANG
  // =========================
  const renderBarang = ({ item }) => {
    return (
      <View style={styles.card}>
        <View style={styles.foto}>
          <Text style={styles.fotoText}>📦</Text>
        </View>

        <Text style={styles.namaBarang}>
          {item.nama}
        </Text>

        <Text style={styles.info}>
          📍 {item.lokasi}
        </Text>

        <Text style={styles.info}>
          🔎 {item.ciri}
        </Text>

        <View style={styles.actions}>
          <TouchableOpacity
            style={styles.editButton}
            onPress={() => bukaEdit(item)}
          >
            <Text style={styles.editText}>
              Edit
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.takeButton}
            onPress={() => bukaTerambil(item)}
          >
            <Text style={styles.takeText}>
              Terambil
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={kembali}>
          <Text style={styles.back}>←</Text>
        </TouchableOpacity>

        <View>
          <Text style={styles.headerTitle}>
            Admin Kesiswaan
          </Text>

          <Text style={styles.headerSubtitle}>
            Lost & Found
          </Text>
        </View>
      </View>

      <ScrollView>
        <View style={styles.content}>

          {/* STATISTIK */}
          <View style={styles.stats}>
            <View style={styles.statBox}>
              <Text style={styles.statNumber}>
                {barang.length}
              </Text>

              <Text style={styles.statText}>
                Barang Temuan
              </Text>
            </View>

            <View style={styles.statBox}>
              <Text style={styles.statNumber}>
                {arsip.length}
              </Text>

              <Text style={styles.statText}>
                Arsip
              </Text>
            </View>
          </View>

          {/* TOMBOL TAMBAH */}
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => {
              resetForm();
              setModal("tambah");
            }}
          >
            <Text style={styles.addText}>
              + Tambah Barang Temuan
            </Text>
          </TouchableOpacity>

          <Text style={styles.sectionTitle}>
            Barang Temuan
          </Text>

          {barang.length === 0 ? (
            <View style={styles.empty}>
              <Text style={styles.emptyIcon}>
                📭
              </Text>

              <Text>
                Tidak ada barang temuan.
              </Text>
            </View>
          ) : (
            barang.map((item) => (
              <View key={item.id}>
                {renderBarang({ item })}
              </View>
            ))
          )}

          {/* ARSIP */}
          <Text style={styles.sectionTitle}>
            Arsip Barang Terambil
          </Text>

          {arsip.length === 0 ? (
            <Text style={styles.emptyText}>
              Belum ada barang yang terambil.
            </Text>
          ) : (
            arsip.map((item) => (
              <View
                key={item.id}
                style={styles.archiveCard}
              >
                <Text style={styles.archiveTitle}>
                  {item.nama}
                </Text>

                <Text>
                  Diambil oleh:{" "}
                  <Text style={styles.bold}>
                    {item.namaPengambil}
                  </Text>
                </Text>

                <Text>
                  NIS: {item.nisPengambil}
                </Text>

                <Text>
                  Kelas: {item.kelasPengambil}
                </Text>
              </View>
            ))
          )}
        </View>
      </ScrollView>

      {/* ======================== */}
      {/* MODAL */}
      {/* ======================== */}

      <Modal
        visible={modal !== null}
        transparent
        animationType="slide"
        onRequestClose={resetForm}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modal}>

            {/* TAMBAH / EDIT */}
            {(modal === "tambah" ||
              modal === "edit") && (
              <>
                <Text style={styles.modalTitle}>
                  {modal === "tambah"
                    ? "Tambah Barang"
                    : "Edit Barang"}
                </Text>

                <Text style={styles.label}>
                  Nama Barang
                </Text>

                <TextInput
                  style={styles.input}
                  placeholder="Contoh: Dompet"
                  value={nama}
                  onChangeText={setNama}
                />

                <Text style={styles.label}>
                  Ciri-ciri
                </Text>

                <TextInput
                  style={[
                    styles.input,
                    styles.textArea,
                  ]}
                  placeholder="Ciri-ciri barang"
                  multiline
                  value={ciri}
                  onChangeText={setCiri}
                />

                <Text style={styles.label}>
                  Lokasi Ditemukan
                </Text>

                <TextInput
                  style={styles.input}
                  placeholder="Contoh: Kantin"
                  value={lokasi}
                  onChangeText={setLokasi}
                />

                <TouchableOpacity
                  style={styles.saveButton}
                  onPress={
                    modal === "tambah"
                      ? simpanTambah
                      : simpanEdit
                  }
                >
                  <Text style={styles.saveText}>
                    SIMPAN
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={resetForm}
                >
                  <Text style={styles.cancelText}>
                    Batal
                  </Text>
                </TouchableOpacity>
              </>
            )}

            {/* TERAMBIL */}
            {modal === "terambil" && (
              <>
                <Text style={styles.modalTitle}>
                  Barang Terambil
                </Text>

                <Text style={styles.selectedItem}>
                  Barang:{" "}
                  <Text style={styles.bold}>
                    {barangDipilih?.nama}
                  </Text>
                </Text>

                <Text style={styles.label}>
                  Nama Pengambil
                </Text>

                <TextInput
                  style={styles.input}
                  placeholder="Nama lengkap"
                  value={namaPengambil}
                  onChangeText={setNamaPengambil}
                />

                <Text style={styles.label}>
                  NIS
                </Text>

                <TextInput
                  style={styles.input}
                  placeholder="NIS"
                  keyboardType="numeric"
                  value={nisPengambil}
                  onChangeText={setNisPengambil}
                />

                <Text style={styles.label}>
                  Kelas
                </Text>

                <TextInput
                  style={styles.input}
                  placeholder="Contoh: XI RPL 3"
                  value={kelasPengambil}
                  onChangeText={setKelasPengambil}
                />

                <TouchableOpacity
                  style={styles.saveButton}
                  onPress={simpanTerambil}
                >
                  <Text style={styles.saveText}>
                    SIMPAN & PINDAHKAN KE ARSIP
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={resetForm}
                >
                  <Text style={styles.cancelText}>
                    Batal
                  </Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </Modal>
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
    backgroundColor: "white",
    padding: 20,
  },

  back: {
    fontSize: 30,
    marginRight: 15,
  },

  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#172B4D",
  },

  headerSubtitle: {
    color: "#667085",
  },

  content: {
    padding: 15,
  },

  stats: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 15,
  },

  statBox: {
    flex: 1,
    backgroundColor: "white",
    padding: 18,
    borderRadius: 12,
    alignItems: "center",
  },

  statNumber: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#2563EB",
  },

  statText: {
    color: "#667085",
    marginTop: 5,
  },

  addButton: {
    backgroundColor: "#2563EB",
    padding: 15,
    borderRadius: 10,
    marginBottom: 25,
  },

  addText: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 12,
    marginTop: 10,
    color: "#172B4D",
  },

  card: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 14,
    marginBottom: 15,
  },

  foto: {
    height: 100,
    backgroundColor: "#E8EDF5",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },

  fotoText: {
    fontSize: 45,
  },

  namaBarang: {
    fontSize: 19,
    fontWeight: "bold",
    marginBottom: 8,
  },

  info: {
    color: "#667085",
    marginBottom: 4,
  },

  actions: {
    flexDirection: "row",
    gap: 10,
    marginTop: 15,
  },

  editButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#2563EB",
    padding: 12,
    borderRadius: 8,
  },

  editText: {
    textAlign: "center",
    color: "#2563EB",
    fontWeight: "bold",
  },

  takeButton: {
    flex: 1,
    backgroundColor: "#16A34A",
    padding: 12,
    borderRadius: 8,
  },

  takeText: {
    textAlign: "center",
    color: "white",
    fontWeight: "bold",
  },

  archiveCard: {
    backgroundColor: "#EAF7EE",
    padding: 15,
    borderRadius: 12,
    marginBottom: 12,
  },

  archiveTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },

  bold: {
    fontWeight: "bold",
  },

  empty: {
    alignItems: "center",
    padding: 30,
    backgroundColor: "white",
    borderRadius: 12,
  },

  emptyIcon: {
    fontSize: 40,
    marginBottom: 10,
  },

  emptyText: {
    color: "#667085",
    marginBottom: 15,
  },

  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end",
  },

  modal: {
    backgroundColor: "white",
    padding: 25,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },

  modalTitle: {
    fontSize: 23,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#172B4D",
  },

  selectedItem: {
    marginBottom: 20,
    color: "#667085",
  },

  label: {
    fontWeight: "600",
    marginBottom: 7,
  },

  input: {
    borderWidth: 1,
    borderColor: "#D0D5DD",
    borderRadius: 9,
    padding: 12,
    marginBottom: 15,
  },

  textArea: {
    height: 80,
    textAlignVertical: "top",
  },

  saveButton: {
    backgroundColor: "#2563EB",
    padding: 15,
    borderRadius: 10,
    marginTop: 5,
  },

  saveText: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
  },

  cancelText: {
    textAlign: "center",
    color: "#667085",
    marginTop: 15,
    marginBottom: 10,
  },
});