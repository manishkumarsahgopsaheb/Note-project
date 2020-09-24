console.log('welcome to note app');
// if user add a note then, add to a localstorage
showNotes();
let addBtn = document.getElementById('addBtn');
addBtn.addEventListener("click", function (e) {

    let addTxt = document.getElementById('addTxt');
    let addTitle = document.getElementById('addTitle');



    // ydi pehle se localstorage me notes nam se kucch ho to

    let notes = localStorage.getItem("notes");

    if (notes == null) {
        // array hai jo ki blank hai
        notesObj = [];
    }
    else {
        // ye array string format me value lo store kiye huve hai
        notesObj = JSON.parse(notes);
    }

    let obj = {
        text: addTxt.value,
        title: addTitle.value
    }
    notesObj.push(obj);// notesObj array me input text ko dal diya
    localStorage.setItem("notes", JSON.stringify(notesObj));// ab array notesObj ko utha kr localstorage me dal diya
    addTxt.value = "";
    addTitle.value = "";
    //console.log(notesObj);
    showNotes();
});

// function to show notes
function showNotes() {
    let notes = localStorage.getItem("notes");

    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }

    let html = ""; // blank string banaya

    //  console.log(notes);
    notesObj.forEach(function (element, index) {
        html += `
        <div class="noteCard my-2 mx-2 card" style="width: 18rem;">
        <div class="card-body">
            <h5 class="card-title"> ${element.title}</h5>
            <p class="card-text">${element.text}</p>
            <button id="${index}"onclick="deleteNote(this.id)" class="btn btn-primary">Delete Note</button>
        </div>
    </div>  
          `;
    });

    let notesElm = document.getElementById('notes');

    if (notesObj.length != 0) {
        notesElm.innerHTML = html;
    }
    else {
        notesElm.innerHTML = `Nothing to show! Use "Add a Note" section above to add notes.`;
    }

}

// function to delete notes

function deleteNote(index) {
    // console.log('i m deleting', index);
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }

    notesObj.splice(index, 1);

    localStorage.setItem("notes", JSON.stringify(notesObj));
    showNotes();

}

// for searching

let search = document.getElementById('searchTxt');
search.addEventListener("input", function () {
// console.log('input event fired');
let inputVal = search.value;
// console.log(inputval);
let noteCards = document.getElementsByClassName('noteCard');
Array.from(noteCards).forEach(function(element){
    
    let cardTxt = element.getElementsByTagName("p")[0].innerText;
    if(cardTxt.includes(inputVal)){
        element.style.display = "block";
    }
    else{
        element.style.display = "none";
    }
}) 
});