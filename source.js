document.getElementById('NoteMaker').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        //make a new note
        var newNoteDragger = document.createElement('div');
        newNoteDragger.className = 'note-dragger'
        newNoteDragger.textContent = ' ';
        document.getElementById('container').appendChild(newNoteDragger);
        var newNote = document.createElement('div');
        newNote.className = 'new-note';
        newNote.textContent = event.target.value;
        newNoteDragger.appendChild(newNote)
        var noteSizer = document.createElement('div');
        noteSizer.className = 'note-sizer';
        noteSizer.textContent = ' ';
        newNote.appendChild(noteSizer);
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
    if (event.target.classList.contains('note-sizer')) {
        event.preventDefault();
        var startMousePos = { x: event.clientX, y: event.clientY };
        var startSize = { width: event.target.parentElement.offsetWidth, height: event.target.parentElement.offsetHeight };

        function onMouseMove(event) {
            var newSize = {
                width: startSize.width + (event.clientX - startMousePos.x),
                height: startSize.height + (event.clientY - startMousePos.y)
            };

            // Update the new-note size
            if (event.target.classList.contains('note-sizer')) {
                event.target.parentElement.style.width = newSize.width + 'px';
                event.target.parentElement.style.height = newSize.height + 'px';
                event.target.parentElement.parentElement.style.width = newSize.width + 2 + 'px';
                event.target.parentElement.parentElement.style.height = newSize.height + 'px';
            }
        }

        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
    }

    function onMouseUp() {
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
    }
});