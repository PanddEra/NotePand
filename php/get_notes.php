<?php
require 'db.php';
global $pdo;

$stmt = $pdo->query("SELECT * FROM notes ORDER BY created_at DESC");
$notes = $stmt->fetchAll(PDO::FETCH_ASSOC);

echo json_encode($notes);