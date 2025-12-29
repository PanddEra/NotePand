# NotePand

A simple web app to **add, view, and store notes** using HTML, CSS, JS, PHP, and MySQL.

---

## Features

- Add notes with title and content
- Notes are stored in **MySQL database**
- Notes load dynamically on page load
- Frontend built with **HTML, CSS, JavaScript**
- Backend built with **PHP**

---

## Project Structure

```
notes-app/
│
├── index.html 
├── css/
│ └── style.css 
├── js/
│ └── app.js 
└── php/
  ├── db.php 
  ├── add_note.php 
  ├── get_notes.php
  ├── update_note.php
  └── delete_note.php
```
---

## Setup (Local XAMPP)

1. Move `NotePand` to `C:\xampp\htdocs\`
2. Start **Apache** and **MySQL** in XAMPP
3. Create MySQL database:

```sql
CREATE DATABASE notes_app;
CREATE TABLE notes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```
Open in browser:
`http://localhost/NotePand/index.html`

Usage
 - Enter title and content

 - Click Add Note

 - Notes appear below and are saved in MySQL

Future Updates
 - Delete notes functionality

 - Edit notes

 - User accounts / login system

 - Better styling / mobile responsive
