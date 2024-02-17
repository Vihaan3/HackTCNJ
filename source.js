document.getElementById('NoteMaker').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        console.log('Text box value:', event.target.value);
        // Perform your action here, such as creating a new note
        var newNote = document.createElement('div');
        newNote.className = 'new-note';
        newNote.textContent = 'okay : ', event.target.value;
        document.getElementById('container').appendChild(newNote);
        // Clear the text box
        event.target.value = '';
    }
});