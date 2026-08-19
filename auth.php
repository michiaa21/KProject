<?php
if (session_status() == PHP_SESSION_NONE) session_start();
include_once __DIR__ . "/config.php";

if (!isset($_SESSION['login']) || $_SESSION['login'] !== true) {
    header("Location: $url/login.php");
    exit();
}

function isGuru() {
    return (isset($_SESSION['role']) && $_SESSION['role'] === 'guru');
}

function isSiswa() {
    return (isset($_SESSION['role']) && $_SESSION['role'] === 'siswa');
}
?>
