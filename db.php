<?php
$server   = "localhost";
$username = "root";
$password = "";
$database = "absensi";

$connect = mysqli_connect($server, $username, $password, $database);

if (!$connect) {
    die("Koneksi gagal: " . mysqli_connect_error());
}
?>
