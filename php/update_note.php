<?php
require 'db.php';
global $pdo;

$data = json_decode(file_get_contents("php://input"), true);

$id = (int) ($data['id'] ?? 0);
$title = trim($data['title'] ?? '');
$content = trim($data['content'] ?? '');

if ($id <= 0 || $title === '' || $content === '') {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid data']);
    exit;
}

$stmt = $pdo->prepare(
    "UPDATE notes SET title = :title, content = :content WHERE id = :id"
);

$stmt->execute([
    ':id' => $id,
    ':title' => $title,
    ':content' => $content
]);

echo json_encode(['success' => true]);