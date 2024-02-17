document.getElementById('NoteMaker').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        console.log('Text box value:', event.target.value);
        //make a new note
        var newNote = document.createElement('div');
        newNote.className = 'new-note';
        newNote.textContent = event.target.value;
        document.getElementById('container').appendChild(newNote);
        //clear the text box
        event.target.value = '';
    }
});