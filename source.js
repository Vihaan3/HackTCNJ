document.getElementById('NoteMaker').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        console.log('Text box value:', event.target.value);
        //make a new note
        var newNoteDragger = document.createElement('div');
        var newNote = document.createElement('div');
        newNote.className = 'new-note';
        newNoteDragger.className = 'note-dragger'
        newNote.textContent = event.target.value;
        newNoteDragger.textContent = ' ';
        document.getElementById('container').appendChild(newNoteDragger);
        newNoteDragger.appendChild(newNote)
        //clear the text box
        event.target.value = '';
    }
});

var NoteContainer = document.getElementById('container');

NoteContainer.addEventListener('mousedown', function(event) {
    if (event.target.classList.contains('note-dragger')) {
        var startMousePos = { x: event.clientX, y: event.clientY };
        var startDivPos = { x: event.target.offsetLeft, y: event.target.offsetTop };

        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);

        function onMouseMove(event) {
            var newPosition = {
                x: startDivPos.x + (event.clientX - startMousePos.x),
                y: startDivPos.y + (event.clientY - startMousePos.y)
            };
        
            //make sure the note stays within the container
            var containerRect = container.getBoundingClientRect();
            if (newPosition.x <  0) {
                newPosition.x =  0;
            } else if (newPosition.x + event.target.offsetWidth > containerRect.width) {
                newPosition.x = containerRect.width - event.target.offsetWidth;
            }
        
            if (newPosition.y <  0) {
                newPosition.y =  0;
            } else if (newPosition.y + event.target.offsetHeight > containerRect.height) {
                newPosition.y = containerRect.height - event.target.offsetHeight;
            }
        
            //change the position of the note
            //sometimes the whole container moves so that's not good
            if (event.target.classList.contains('note-dragger')) {
                event.target.style.left = newPosition.x + 'px';
                event.target.style.top = newPosition.y + 'px';
            }
        }

        function onMouseUp() {
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
        }
    }
});