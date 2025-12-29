<?php
require 'db.php';
global $pdo;

$data = json_decode(file_get_contents("php://input"), true);

$title = trim($data['title'] ?? '');
$content = trim($data['content'] ?? '');

if ($title === '' || $content === '') {
    http_response_code(400);
    echo json_encode(['error' => 'Empty fields']);
    exit;
}

$stmt = $pdo->prepare("INSERT INTO notes (title, content) VALUES (:title, :content)");

$stmt->execute([
    ':title' => $title,
    ':content' => $content
]);

echo json_encode(['success' => true]);
