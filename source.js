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
            updateArrows();
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
contextMenu.style.backgroundColor = '#343a40';
contextMenu.style.color = '#ccc';
contextMenu.style.border = '1px solid #ccc';
contextMenu.style.paddingRight = '25px';
contextMenu.style.fontSize = '12';
contextMenu.innerHTML = '<ul><li id="option1">Create a new note</li></ul>';
document.body.appendChild(contextMenu);

// Add event listeners to the document
document.addEventListener('contextmenu', function(event) {
    event.preventDefault();
    MakeNewNote();
});

function MakeNewNote() {
    var newNoteDragger = document.createElement('div');
    newNoteDragger.className = 'note-dragger'
    newNoteDragger.textContent = ' ';
    document.getElementById('container').appendChild(newNoteDragger);
    var newNote = document.createElement('div');
    newNote.className = 'new-note';
    newNote.textContent = 'edit me!';
    newNote.setAttribute('contenteditable', 'true');
    newNoteDragger.appendChild(newNote)
    var noteSizer = document.createElement('div');
    noteSizer.className = 'note-sizer';
    noteSizer.textContent = ' ';
    newNote.appendChild(noteSizer);
}

var UserName = null;
function Save() {
    if (UserName){
        alert("saved!");
    } else {
        alert("you need to sign in");
    }
}
//logging in
function MakeLoginButton() {
    var modal = document.getElementById('login-modal');
    var span = document.getElementsByClassName('login-close-button')[0];

    modal.style.display = 'block';

    span.onclick = function() {
        modal.style.display = 'none';
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    }
}
document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from submitting normally

    // Retrieve the username and password from the form
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;

    // You can now use the username and password for authentication
    console.log('Username:', username);
    console.log('Password:', password);

    // Close the modal after successful login (or handle authentication failure)
    var modal = document.getElementById('login-modal');
    modal.style.display = 'none';
});
//signing up
function MakeSignupButton() {
    var modal = document.getElementById('signup-modal');
    var span = document.getElementsByClassName('signup-close-button')[0];

    modal.style.display = 'block';

    span.onclick = function() {
        modal.style.display = 'none';
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    }
}
document.getElementById('signup-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from submitting normally

    // Retrieve the username and password from the form
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;

    // You can now use the username and password for authentication
    console.log('Username:', username);
    console.log('Password:', password);
    

    // Close the modal after successful sign up (or handle authentication failure)
    var modal = document.getElementById('signup-modal');
    modal.style.display = 'none';
});

document.getElementById('create-note-button').addEventListener('click', MakeNewNote);
document.getElementById('create-notebook-button').addEventListener('click', MakeNewNote); //TODO
document.getElementById('notebooks').addEventListener('click', MakeNewNote); //TODO

document.getElementById('save').addEventListener('click', Save); //Incomplete
document.getElementById('login-button').addEventListener('click', MakeLoginButton); //Incomplete
document.getElementById('signup-button').addEventListener('click', MakeSignupButton); //Incomplete