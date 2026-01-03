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
        div.innerHTML =
            `<h3>${note.title}</h3>
            <p>${note.content}</p>;`
        noteList.appendChild(div);
    });

    notes.forEach(note => {
        const div = document.createElement('div');
        div.className = 'note-card';
        div.innerHTML = `
        <h3>${note.title}</h3>
        <p>${note.content}</p>
        <button data-id="${note.id}">Delete</button>
    `;

        const deleteBtn = div.querySelector('button');
        deleteBtn.addEventListener('click', () => {
            deleteNote(note.id);
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