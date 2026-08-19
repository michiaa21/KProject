<?php
session_start();
include("../includes/config.php");
include("../includes/db.php");
include("../includes/auth.php");

    if (!isset($_GET['aksi'])) {
        header("Location: $url/pages/siswa");
        exit();
    }

        $aksi = $_GET['aksi'];

        switch ($aksi) {
            case 'tambah':
                if (isGuru()) {
                    $_SESSION['errors'] = ["Hanya siswa yang boleh menambah siswa!"];
                    header("Location: $url/pages/siswa");
                    exit();
                }

                if (isset($_POST['tambah'])) {
                    $nis     = trim($_POST['nis'] ?? '');
                    $nama    = trim($_POST['nama'] ?? '');
                    $absen   = trim($_POST['absen'] ?? '');
                    $kelamin = trim($_POST['kelamin'] ?? '');

                    $errors = [];
                    $old = compact('nis','nama','absen','kelamin');

                    if ($nis == '') $errors[] = "NIS wajib diisi";
                    if ($nama == '') $errors[] = "Nama wajib diisi";
                    if ($absen == '') $errors[] = "Nomor absen wajib diisi";
                    if ($kelamin == '') $errors[] = "Jenis kelamin wajib diisi";

                    $cek = $connect->query("SELECT nis FROM siswa WHERE nis='$nis' LIMIT 1");
                    if ($cek->num_rows > 0) $errors[] = "NIS sudah digunakan";

                    if (!empty($errors)) {
                        $_SESSION['errors'] = $errors;
                        $_SESSION['old'] = $old;
                        header("Location: $url/pages/siswa/tambah.php");
                        exit();
                    }

                    $sql = "INSERT INTO siswa (nis, nama, absen, Kelamin)
                            VALUES ('$nis', '$nama', '$absen', '$kelamin')";
                    if ($connect->query($sql)) {
                        $_SESSION['sukses'] = "Data siswa berhasil ditambahkan";
                        header("Location: $url/pages/siswa");
                        exit();
                    }
                }
                break;

            case 'edit':
                if (isGuru()) {
                    $_SESSION['errors'] = ["Hanya siswa yang boleh mengedit siswa!"];
                    header("Location: $url/pages/siswa");
                    exit();
                }

                if (isset($_POST['edit']) && isset($_GET['nis'])) {
                    $nis = $_GET['nis'];
                    $nama = trim($_POST['nama'] ?? '');
                    $absen = trim($_POST['absen'] ?? '');
                    $kelamin = trim($_POST['Kelamin'] ?? '');

                    $errors = [];
                    $old = compact('nama','absen','Kelamin');

                    if ($nama == '') $errors[] = "Nama wajib diisi";
                    if ($absen == '') $errors[] = "Nomor absen wajib diisi";
                    if ($kelamin == '') $errors[] = "Jenis kelamin wajib diisi";

                    if (!empty($errors)) {
                        $_SESSION['errors'] = $errors;
                        $_SESSION['old'] = $old;
                        header("Location: $url/pages/siswa/edit.php?nis=" . $nis);
                        exit();
                    }

                    $sql = "UPDATE siswa SET nama='$nama', absen='$absen', Kelamin='$kelamin' WHERE nis='$nis'";
                    if ($connect->query($sql)) {
                        $_SESSION['sukses'] = "Data siswa berhasil diperbarui";
                        header("Location: $url/pages/siswa");
                        exit();
                    }
                }
                break;

            case 'hapus':
                if (isGuru()) {
                    $_SESSION['errors'] = ["Hanya siswa yang boleh menghapus siswa!"];
                    header("Location: $url/pages/siswa");
                    exit();
                }

                if (isset($_GET['nis'])) {
                    $nis = $_GET['nis'];
                    $cek = $connect->query("SELECT * FROM siswa WHERE nis='$nis' LIMIT 1");
                    if ($cek->num_rows == 0) {
                        $_SESSION['errors'] = ["Data siswa tidak ditemukan"];
                        header("Location: $url/pages/siswa");
                        exit();
                    }
                    $connect->query("DELETE FROM siswa WHERE nis='$nis'");
                    $_SESSION['sukses'] = "Data siswa berhasil dihapus";
                    header("Location: $url/pages/siswa");
                    exit();
                }
                break;

            default:
                header("Location: $url/pages/siswa");
                exit();
        }
?>
