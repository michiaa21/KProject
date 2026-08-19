<?php
session_start();
include("../includes/config.php");
include("../includes/db.php");
include("../includes/auth.php");

    if (!isset($_GET['aksi'])) {
        header("Location: $url/pages/absensi");
        exit();
    }
        $aksi = $_GET['aksi'];
            switch ($aksi) {
                case 'tambah':

                    if (isGuru()) {
                        $_SESSION['errors'] = ["Hanya siswa yang dapat menambah presensi!"];
                        header("Location: $url/pages/absensi");
                        exit();
                    }
                    if ($_SERVER['REQUEST_METHOD'] === 'POST') {

                        $id_pengguna = $_SESSION['id_pengguna'];
                        $nis         = trim($_POST['nis']);
                        $tanggal     = trim($_POST['tanggal']);
                        $kehadiran   = trim($_POST['kehadiran']);
                        $keterangan  = trim($_POST['keterangan']);

                        $errors = [];

                        if ($nis == '')        $errors[] = "NIS wajib dipilih";
                        if ($tanggal == '')    $errors[] = "Tanggal wajib diisi";
                        if ($kehadiran == '')  $errors[] = "Kehadiran wajib dipilih";

                        $cek = $connect->query("
                            SELECT pd.*
                            FROM presensi_detail pd
                            JOIN presensi p ON pd.id_presensi = p.id_absen
                            WHERE pd.nis='$nis' AND p.tanggal='$tanggal'
                            LIMIT 1
                        ");
                        if ($cek->num_rows > 0)
                            $errors[] = "Siswa ini sudah absen pada tanggal tersebut";

                        if (!empty($errors)) {
                            $_SESSION['errors'] = $errors;
                            $_SESSION['old'] = $_POST;
                            header("Location: $url/pages/absensi/tambah.php");
                            exit();
                        }

                        $cekPresensi = $connect->query("SELECT * FROM presensi WHERE tanggal='$tanggal' LIMIT 1");

                        if ($cekPresensi->num_rows == 0) {
                            $connect->query("
                                INSERT INTO presensi (id_pengguna, tanggal)
                                VALUES ('$id_pengguna', '$tanggal')
                            ");
                            $id_presensi = $connect->insert_id;
                        } else {
                            $row = $cekPresensi->fetch_assoc();
                            $id_presensi = $row['id_absen'];
                        }

                        $sql = "
                            INSERT INTO presensi_detail (id_presensi, id_pengguna, nis, kehadiran, keterangan)
                            VALUES ('$id_presensi', '$id_pengguna', '$nis', '$kehadiran', '".$connect->real_escape_string($keterangan)."')
                        ";

                        if ($connect->query($sql)) {
                            $_SESSION['sukses'] = "Absensi berhasil ditambahkan!";
                        }

                        header("Location: $url/pages/absensi");
                        exit();
                    }

            break;

            case 'edit':
                    if (isGuru()) {
                        $_SESSION['errors'] = ["Hanya siswa yang dapat mengedit presensi!"];
                        header("Location: $url/pages/absensi");
                        exit();
                    }

                    if (isset($_POST['edit']) && isset($_GET['id'])) {

                        $id_detail   = $_GET['id']; 
                        $nis         = trim($_POST['nis']);
                        $kehadiran   = trim($_POST['kehadiran']);
                        $keterangan  = trim($_POST['keterangan']);

                        $errors = [];

                        if ($nis == '')       $errors[] = "NIS wajib dipilih";
                        if ($kehadiran == '') $errors[] = "Kehadiran wajib diisi";

                        $cek = $connect->query("SELECT * FROM presensi_detail WHERE id_detail='$id_detail'");
                        if ($cek->num_rows == 0)
                            $errors[] = "Data absensi tidak ditemukan";

                        if (!empty($errors)) {
                            $_SESSION['errors'] = $errors;
                            header("Location: $url/pages/absensi/edit.php?id=" . $id_detail);
                            exit();
                        }

                        $sql = "
                            UPDATE presensi_detail 
                            SET nis='$nis',
                                kehadiran='$kehadiran',
                                keterangan='".$connect->real_escape_string($keterangan)."'
                            WHERE id_detail='$id_detail'
                        ";

                        if ($connect->query($sql)) {
                            $_SESSION['sukses'] = "Absensi berhasil diperbarui!";
                        }

                        header("Location: $url/pages/absensi");
                        exit();
                    }
            break;

            case 'hapus':
                $id_detail = $_GET['id'];

                $cek = $connect->query("SELECT * FROM presensi_detail WHERE id_detail='$id_detail'");
                if ($cek->num_rows == 0) {
                    $_SESSION['errors'] = ["Data tidak ditemukan"];
                    header("Location: $url/pages/absensi");
                    exit();
                }

                $id_presensi = $cek->fetch_assoc()['id_presensi'];

                $connect->query("DELETE FROM presensi_detail WHERE id_detail='$id_detail'");

                $cekDetail = $connect->query("SELECT * FROM presensi_detail WHERE id_presensi='$id_presensi'");
                if ($cekDetail->num_rows == 0) {
                    $connect->query("DELETE FROM presensi WHERE id_absen='$id_presensi'");
                }

                $_SESSION['sukses'] = "Absensi berhasil dihapus";
                header("Location: $url/pages/absensi");
                exit();

                break;


                default:
                    header("Location: $url/pages/absensi");
                    exit();

                }
?>
