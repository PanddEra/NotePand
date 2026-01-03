'use strict';

const addNoteBtn = document.getElementById('add-note-btn');
const noteList = document.getElementById('notes-list');

addNoteBtn.addEventListener('click', async (e) => {
    let noteTitleValue = document.getElementById('note-title').value;
    let noteContentValue = document.getElementById('note-content').value;

    if (!noteTitleValue || !noteContentValue) {
        alert('Please fill both title and content!');
        console.error('title or content is not valid!');
        return;
    }

    await fetch('php/add_note.php', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({title: noteTitleValue, content: noteContentValue})
    });
    document.getElementById('note-title').value = '';
    document.getElementById('note-content').value = '';

    await loadNotes();
})

async function loadNotes() {
    const res = await fetch('php/get_notes.php');
    const notes = await res.json();
    noteList.innerHTML = '';
    notes.forEach(note => {
        const div = document.createElement('div');
        div.className = 'note-card';
        div.innerHTML = `
        <h3>${note.title}</h3>
        <p>${note.content}</p>
        <button class="edit-btn">Edit</button>
        <button class="delete-btn" data-id="${note.id}">Delete</button>
    `;

        div.querySelector('.delete-btn').addEventListener('click', () => {
            deleteNote(note.id);
        });
        div.querySelector('.edit-btn').addEventListener('click', () => {
            editNote(note);
        });

        noteList.appendChild(div);
    });
}

async function deleteNote(id) {
    await fetch('php/delete_note.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id })
    });

    await loadNotes();
}

async function editNote(note) {
    const newTitle = prompt('Edit title:', note.title);
    if (newTitle === null) return;

    const newContent = prompt('Edit content:', note.content);
    if (newContent === null) return;

    await updateNote(note.id, newTitle, newContent);
}

async function updateNote(id, title, content) {
    await fetch('php/update_note.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, title, content })
    });

    await loadNotes();
}
loadNotes();