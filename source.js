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
async function MakeNewNote() {
    var newNoteDragger = document.createElement('div');
    newNoteDragger.className = 'note-dragger';
    newNoteDragger.textContent = ' ';
    document.getElementById('container').appendChild(newNoteDragger);

    var newNote = document.createElement('div');
    newNote.id = "new-note"
    newNote.className = 'new-note';
    newNote.textContent = 'edit me!';
    newNote.setAttribute('contenteditable', 'true');
    newNoteDragger.appendChild(newNote);

    var noteSizer = document.createElement('div');
    noteSizer.className = 'note-sizer';
    noteSizer.textContent = ' ';
    newNote.appendChild(noteSizer);

    // Create a button element
    var button = document.createElement('button');
    button.textContent = 'AI Expand'; // Set the button text
    button.className = 'note-button'; // Add a class for styling
    newNote.appendChild(button); // Append the button to the note

    // Set the contenteditable attribute of the parent element to false
    newNote.setAttribute('contenteditable', 'false');

    // Attach the event listener to the button
    button.addEventListener("click", send_text_to_ai);
    function send_text_to_ai() {
        note_text = document.getElementById("new-note").textContent;
        note_text = note_text.replace('AI Expand', '');
        console.log(note_text);
    }
}

import { GoogleGenerativeAI } from "@google/generative-ai";
 
const Your_API_Key = "AIzaSyDCKm38Gqmwu1YywB6paoSkVXlJ-qLHKUk"
const genAI = new GoogleGenerativeAI(Your_API_Key);

async function run() {
  // For text-only input, use the gemini-pro model
  const model = genAI.getGenerativeModel({ model: "gemini-pro"});

  const prompt = note_text;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  console.log(text);
}

run();
