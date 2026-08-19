<?php
    session_start();
    include("../includes/config.php");
    include("../includes/db.php");
    include("../includes/auth.php");

if (isGuru()) {
    $_SESSION['errors'] = ["Guru hanya boleh melihat data pengguna"];
    header("Location: $url/pages/pengguna");
    exit;
}

if (!isset($_GET['aksi'])) {
    header("Location: $url/pages/pengguna");
    exit;
}

$aksi = $_GET['aksi'];

switch ($aksi) {

    case 'tambah':
        if (isset($_POST['tambah'])) {
            $username = trim(htmlspecialchars($_POST['username'] ?? ''));
            $password = trim(htmlspecialchars($_POST['password'] ?? ''));
            $nama     = trim(htmlspecialchars($_POST['nama'] ?? ''));
            $role     = trim(htmlspecialchars($_POST['role'] ?? ''));

            $errors = [];
            $old = compact('username','nama','role');

            if ($username === '') {
                $errors[] = "Username wajib diisi-!";
            } else {
                $cek = $connect->prepare("SELECT username FROM pengguna WHERE username = ? LIMIT 1");
                $cek->bind_param("s", $username);
                $cek->execute();
                $hasilcek = $cek->get_result();

                if ($hasilcek->num_rows > 0) {
                    $errors[] = "Username sudah digunakan-!";
                }
            }

            if ($password === '') {
                $errors[] = "Password wajib diisi-!";
            } elseif (strlen($password) < 6) {
                $errors[] = "Password minimal 6 karakter-!";
            }

            if ($nama === '') $errors[] = "Nama wajib diisi-!";
            if ($role === '') $errors[] = "Role wajib dipilih-!";

            if (!empty($errors)) {
                $_SESSION['errors'] = $errors;
                $_SESSION['old'] = $old;
                header("Location: $url/pages/pengguna/tambah.php");
                exit;
            }

            $passwordHash = password_hash($password, PASSWORD_DEFAULT);

            $stmt = $connect->prepare("INSERT INTO pengguna (username, password, nama, role) VALUES (?, ?, ?, ?)");
            $stmt->bind_param("ssss", $username, $passwordHash, $nama, $role);

            if ($stmt->execute()) {
                $stmt->close();
                $_SESSION['sukses'] = "Data berhasil ditambahkan-!";
                header("Location: $url/pages/pengguna");
                exit;
            }
        }
        break;

    case 'edit':
        if (isset($_POST['edit'], $_GET['id'])) {
            $id   = $_GET['id'];
            $nama = trim($_POST['nama'] ?? '');
            $role = trim($_POST['role'] ?? '');

            $errors = [];
            $old = compact('nama', 'role');

            if ($nama === '') $errors[] = "Nama wajib diisi-!";
            if ($role === '') $errors[] = "Role wajib dipilih-!";

            if (!empty($errors)) {
                $_SESSION['errors'] = $errors;
                $_SESSION['old'] = $old;
                header("Location: $url/pages/pengguna/edit.php?id=$id");
                exit;
            }

            if (!empty($_POST['password'])) {
                $passwordHash = password_hash($_POST['password'], PASSWORD_DEFAULT);
                $stmt = $connect->prepare("UPDATE pengguna SET nama = ?, role = ?, password = ? WHERE username = ?");
                $stmt->bind_param("ssss", $nama, $role, $passwordHash, $id);
            } else {
                $stmt = $connect->prepare("UPDATE pengguna SET nama = ?, role = ? WHERE username = ?");
                $stmt->bind_param("sss", $nama, $role, $id);
            }

            if ($stmt->execute()) {
                $stmt->close();
                $_SESSION['sukses'] = "Data berhasil diperbarui-!";
                header("Location: $url/pages/pengguna");
                exit;
            }
        }
        break;

    case 'hapus':
        if (isset($_GET['id'])) {
            $id = $_GET['id'];

            $cek = $connect->prepare("SELECT username FROM pengguna WHERE username = ? LIMIT 1");
            $cek->bind_param("s", $id);
            $cek->execute();
            $hasil = $cek->get_result();

            if ($hasil->num_rows === 0) {
                $_SESSION['errors'] = ["Pengguna tidak ditemukan-!"];
                header("Location: $url/pages/pengguna");
                exit;
            }

            $stmt = $connect->prepare("DELETE FROM pengguna WHERE username = ?");
            $stmt->bind_param("s", $id);

            if ($stmt->execute()) {
                $stmt->close();
                $_SESSION['sukses'] = "Data berhasil dihapus-!";
                header("Location: $url/pages/pengguna");
                exit;
            }
        }
        break;
}
