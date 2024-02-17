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
        newNote.setAttribute('contenteditable', 'true');
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
var DragTarget = null;
var gridSize = 20;

NoteContainer.addEventListener('mousedown', function(event) {

    if (event.target.classList.contains('note-dragger')) {
        DragTarget = event.target;
        var startMousePos = { x: event.clientX, y: event.clientY };
        var startDivPos = { x: DragTarget.offsetLeft, y: DragTarget.offsetTop };

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
            } else if (newPosition.x + DragTarget.offsetWidth > containerRect.width) {
                newPosition.x = containerRect.width - DragTarget.offsetWidth;
            }
        
            if (newPosition.y <  0) {
                newPosition.y =  0;
            } else if (newPosition.y + DragTarget.offsetHeight > containerRect.height) {
                newPosition.y = containerRect.height - DragTarget.offsetHeight;
            }
        
            //change the position of the note
            //sometimes the whole container moves so that's not good
            DragTarget.style.left = newPosition.x + 'px';
            DragTarget.style.top = newPosition.y + 'px';
            
        }

        function onMouseUp() {
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
        }
    }
    if (event.target.classList.contains('note-sizer')) {
        DragTarget = event.target;
        event.preventDefault();
        var startMousePos = { x: event.clientX, y: event.clientY };
        var startSize = { width: DragTarget.parentElement.offsetWidth, height: DragTarget.parentElement.offsetHeight };

        function onMouseMove(event) {
            var newSize = {
                width: startSize.width + (event.clientX - startMousePos.x),
                height: startSize.height + (event.clientY - startMousePos.y)
            };

            // Update the new-note size
            DragTarget.parentElement.style.width = newSize.width + 'px';
            DragTarget.parentElement.style.height = newSize.height + 'px';
            DragTarget.parentElement.parentElement.style.width = newSize.width + 2 + 'px';
            DragTarget.parentElement.parentElement.style.height = newSize.height + 'px';
        }

        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);

        function onMouseUp() {
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
        }
    }
});

// Create a custom context menu
var contextMenu = document.createElement('div');
contextMenu.id = 'custom-context-menu';
contextMenu.style.display = 'none';
contextMenu.style.position = 'absolute';
contextMenu.style.zIndex = '1000';
contextMenu.style.backgroundColor = '#fff';
contextMenu.style.border = '1px solid #ccc';
contextMenu.innerHTML = '<ul><li id="option1">Option  1</li><li id="option2">Option  2</li></ul>';
document.body.appendChild(contextMenu);

// Add event listeners to the document
document.addEventListener('contextmenu', function(event) {
    event.preventDefault(); // Prevent the default context menu from showing
    contextMenu.style.top = event.pageY + 'px';
    contextMenu.style.left = event.pageX + 'px';
    contextMenu.style.display = 'block';
});

document.addEventListener('click', function() {
    contextMenu.style.display = 'none'; // Hide the custom context menu when clicking outside
});

// Add event listeners to the custom context menu options
document.getElementById('option1').addEventListener('click', function() {
    alert('Option  1 clicked');
    contextMenu.style.display = 'none';
});

document.getElementById('option2').addEventListener('click', function() {
    alert('Option  2 clicked');
    contextMenu.style.display = 'none';
});