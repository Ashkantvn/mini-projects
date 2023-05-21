/////dom elements
const formInput = document.getElementById('form-input');
const notesInput = document.getElementById('notes-input');
const notesBox = document.getElementById('notes-box');
//////local storage datas
let lastId = 0;
let description = '';
const notes = [];
const localStorageItems = JSON.parse(localStorage.getItem('notes-data'));
////////
if (localStorageItems) {
    localStorageItems.map((localStorageItem) => {
        lastId = localStorageItem.id;
        notes.push(localStorageItem);
        notesBox.innerHTML = '';
        showDOM();
    })
}
////function for showing
function showDOM() {
    notes.map((item) => {
        ///////show note cards
        const savedNoteBox = document.createElement('div');
        savedNoteBox.textContent = item.description;
        savedNoteBox.classList.add('saved-notes');
        notesBox.appendChild(savedNoteBox);
        /////show  delete button
        const delButton = document.createElement('button');
        delButton.classList.add('button-del');
        delButton.classList.add('button');
        delButton.textContent = 'delete';
        savedNoteBox.appendChild(delButton);
        ////////delete from dom and local storage  
        delButton.onclick = () => {
            savedNoteBox.remove();
            notes.splice(item.id - 1, 1);
            for (let i = 0; i < notes.length; i++) {
                if (i >= item.id - 1) {
                    notes[i].id-=1;
                    lastId=notes[i].id;
                }
            }
            localStorage.setItem('notes-data', JSON.stringify(notes));
        };
    })
}
///////pushing
const pushNotes = () => {
    lastId += 1
    if (lastId > 0 && description) {
        notes.push({ id:lastId, description });
        localStorage.setItem('notes-data', JSON.stringify(notes));
        alert('data saved');
    }
}
/////submit handle
formInput.addEventListener('submit', (e) => {
    e.preventDefault();
    if (notesInput.value) {
        description = notesInput.value;
        notesBox.innerHTML = '';
        pushNotes();
        showDOM();
    } else {
        alert('empty input');
    }
})
