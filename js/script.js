'use strict';

const addNoteBtn = document.getElementById('add-note-btn');
const noteList = document.getElementById('notes-list');

addNoteBtn.addEventListener('click', (e) => {
    let noteTitleValue = document.getElementById('note-title').value;
    let noteContentValue = document.getElementById('note-content').value;

    if (!noteTitleValue || !noteContentValue) {
        alert('Please fill both title and content!');
        console.error('title or content is not valid!');
    }

    const noteCard = document.createElement('div');
    noteCard.classList.add('note-card');
    noteCard.innerHTML = `
        <h3>${noteTitleValue}</h3>
        <p>${noteContentValue}</p>
        <button class="delete-btn">Delete</button>
    `;
    noteList.appendChild(noteCard);
    noteCard.querySelector('.delete-btn').addEventListener('click', () => {
        noteCard.remove();
    });

    document.getElementById('note-title').value = '';
    document.getElementById('note-content').value = '';
})