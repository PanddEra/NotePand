<?php
require 'db.php';
global $pdo;

$data = json_decode(file_get_contents("php://input"), true);
$id = (int) ($data['id'] ?? 0);

if ($id <= 0) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid ID']);
    exit;
}

$stmt = $pdo->prepare("DELETE FROM notes WHERE id = :id");
$stmt->execute([':id' => $id]);

echo json_encode(['success' => true]);
