import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  SafeAreaView,
} from "react-native";

export default function Login({ kembali, berhasil }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const login = () => {
    if (username === "admin" && password === "12345") {
      berhasil();
    } else {
      Alert.alert(
        "Login Gagal",
        "Username atau password salah."
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.form}>
        <Text style={styles.icon}>🔐</Text>

        <Text style={styles.title}>
          Login Admin
        </Text>

        <Text style={styles.subtitle}>
          Kesiswaan SMKN 10 Surabaya
        </Text>

        <Text style={styles.label}>
          Username
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Masukkan username"
          value={username}
          onChangeText={setUsername}
          autoCapitalize="none"
        />

        <Text style={styles.label}>
          Password
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Masukkan password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity
          style={styles.button}
          onPress={login}
        >
          <Text style={styles.buttonText}>
            LOGIN
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={kembali}>
          <Text style={styles.backText}>
            ← Kembali
          </Text>
        </TouchableOpacity>

        <Text style={styles.info}>
          Untuk latihan:{'\n'}
          Username: admin{'\n'}
          Password: 12345
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F7FA",
    justifyContent: "center",
  },

  form: {
    backgroundColor: "white",
    margin: 20,
    padding: 25,
    borderRadius: 18,
    elevation: 3,
  },

  icon: {
    fontSize: 50,
    textAlign: "center",
  },

  title: {
    fontSize: 27,
    fontWeight: "bold",
    textAlign: "center",
    color: "#172B4D",
    marginTop: 10,
  },

  subtitle: {
    textAlign: "center",
    color: "#667085",
    marginBottom: 30,
  },

  label: {
    fontWeight: "600",
    marginBottom: 7,
  },

  input: {
    borderWidth: 1,
    borderColor: "#D0D5DD",
    borderRadius: 10,
    padding: 13,
    marginBottom: 18,
  },

  button: {
    backgroundColor: "#2563EB",
    padding: 15,
    borderRadius: 10,
  },

  buttonText: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
  },

  backText: {
    textAlign: "center",
    color: "#2563EB",
    marginTop: 20,
  },

  info: {
    textAlign: "center",
    marginTop: 25,
    color: "#98A2B3",
    fontSize: 12,
  },
});