let Notes

const noteId = document.getElementById("noteId");
const noteError = document.getElementById("noteError");

const noteDesciptionId = document.getElementById("noteDesciptionId")
const descriptionError = document.getElementById("descriptionError")

const dueDateId = document.getElementById("dueDateId")
const dateError = document.getElementById("dateError")

const dueTimeId = document.getElementById("dueTimeId")
const timeError = document.getElementById("timeError")


const cardsContainer = document.getElementById("cardscontainer")

websiteInit();

function websiteInit() {
    if (localStorage.getItem("notes")) {
        const strNotes = localStorage.getItem("notes")
        Notes = JSON.parse(strNotes)
    }
    else {
        Notes = []
    }
    console.log("Website Initilize...")
    console.log(Notes)
    drawCards();
}

function GetFormValues() {

    let note = {
        note: noteId.value,
        description: noteDesciptionId.value,
        date: dueDateId.value,
        time: dueTimeId.value,
       
    }

    return note
}


function ClearNotes() {
    noteId.value = ""
    noteError.value = ""
    noteDesciptionId.value = ""
    descriptionError.value = ""
    dueDateId.value = ""
    dateError.value = ""
    dueTimeId.innerHTML = ""
    timeError.innerHTML = ""
}

function AddNotesToLocalStorage() {

    let note = GetFormValues()

    console.log(note)

    if (validationErrors(note)) {

        Notes.push(note)
        const stringifyProducts = JSON.stringify(Notes)
        localStorage.setItem("notes", stringifyProducts)
        ClearNotes()
        drawCards()
    }
}


function AddNoteClick() {
    AddNotesToLocalStorage()
}


function validationErrors(obj) {

    if (!obj.note) noteError.innerHTML = "Please Fill To Do Item";
    if (!obj.description) descriptionError.innerHTML = "Please Fill The Description";
    if (!obj.date) dateError.innerHTML = "Please Fill Due Date";
    if (!obj.time) timeError.innerHTML = "Please Fill Due Time";

    if (!obj.note || !obj.description || !obj.date || !obj.time )
        return false

    return true
}




function drawCards()
{
    alert(cardsContainer)
    for(const item of Notes)
    {
        console.log(item)
        const cardBox = document.createElement("div")
        const cardTitle = document.createElement("h2")
        const cardDescription = document.createElement("p")
        const cardPrice = document.createElement("p")
        const cardDiscount = document.createElement("p")


        cardTitle.innerHTML = item.note;
        cardDescription.innerHTML = item.description;
        cardPrice.innerHTML = item.date;
        cardDiscount.innerHTML = item.time.replace(":","-");

        cardBox.appendChild(cardTitle)
        cardBox.appendChild(cardDescription)
        cardBox.appendChild(cardPrice)
        cardBox.appendChild(cardDiscount)


        cardsContainer.appendChild(cardBox)

    }
}