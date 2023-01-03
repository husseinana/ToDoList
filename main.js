let Notes
let Id = 0;
let currentView = 'All'
const noteId = document.getElementById("noteId");
const noteError = document.getElementById("noteError");

const noteDesciptionId = document.getElementById("noteDesciptionId")
const descriptionError = document.getElementById("descriptionError")

const dueDateId = document.getElementById("dueDateId")
const dateError = document.getElementById("dateError")

const dueTimeId = document.getElementById("dueTimeId")
const timeError = document.getElementById("timeError")


const cardsContainer = document.getElementById("cardscontainer")

const formTitle = document.getElementById("formTitle")
const buttonAdd = document.getElementById("buttonAdd")
const noteid = document.getElementById("noteidhidden")

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

    //AddDemoData()

    drawCards();
}

function GetFormValues() {


    let note = {
        id: GetMaxId(),
        note: noteId.value,
        description: noteDesciptionId.value,
        date: dueDateId.value,
        time: dueTimeId.value,
        checked: false,
        inserttime: GetCurDate(),
        ineditmode: false,
    }

    return note
}

function GetMaxId()
{
    if(Notes.length == 0)
        return 0;
    let max = Notes[0].id

    for(const item of Notes)
    {
        if(item.id>max)
            max = item.id;
    }

    return ++max;

}

function getDateFromInput(strDate) {
    const [year, month, day] = strDate.split('-');
    const date = new Date(+year, month - 1, +day + 1);

    return date.toISOString().split('T')[0]
}

function UpdateNote() {
    let id = noteid.innerHTML
    let note = FindNoteOfId(id)
    let noteIndex = Notes.indexOf(note)
    if (note != "") {
        note.note = noteId.value
        note.description = noteDesciptionId.value
        note.date = dueDateId.value;
        note.time = dueTimeId.value
        note.checked = false
        note.inserttime = GetCurDate()
        note.ineditmode = false

        noteid.innerHTML = ""
        formTitle.innerHTML = "Add Task"
        buttonAdd.innerHTML = "Add"

        Notes[Notes] = note

        const stringifyProducts = JSON.stringify(Notes)
        localStorage.setItem("notes", stringifyProducts)
        drawCards()
        ClearNotes()
    }
}



function ClearNotes() {
    noteId.value = ""
    noteid.innerHTML = ""
    noteError.innerHTML = ""
    noteDesciptionId.value = ""
    descriptionError.innerHTML = ""
    dueDateId.value = ""
    dateError.innerHTML = ""
    dueTimeId.value = ""
    timeError.innerHTML = ""

    formTitle.innerHTML = "Add Task"
    buttonAdd.innerHTML = "Add"

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
    let id = noteid.innerHTML

    SetCurrentView('All')

    if (id == "")
        AddNotesToLocalStorage()
    else
        UpdateNote()
}


function validationErrors(obj) {

    if (!obj.note) noteError.innerHTML = "Please Fill To Do Item";
    if (!obj.description) descriptionError.innerHTML = "Please Fill The Description";
    if (!obj.date) dateError.innerHTML = "Please Fill Due Date";
    if (!obj.time) timeError.innerHTML = "Please Fill Due Time";

    if (!obj.note || !obj.description || !obj.date || !obj.time)
        return false

    return true
}


function drawCards() {

    let filter = currentView
    cardsContainer.innerHTML = ""

    if (filter == 'Summary')
        return drawSummary();

    for (const item of Notes) {

        if (filter == 'Done')
            if (!item.checked)
                continue
        if (filter == 'NotDone')
            if (item.checked)
                continue

        const cardBox = document.createElement("div")
        if (item.checked)
            cardBox.setAttribute("class", "card myDIV cardChecked")
        else
            cardBox.setAttribute("class", "card myDIV")


        const cardBody = document.createElement("div")
        cardBody.setAttribute("class", "card-body")

        const cardTitle = document.createElement("div")
        cardTitle.setAttribute("class", "cardtitle btndiv")

        const cardTitleP = document.createElement("p")
        if (item.checked)
            cardTitleP.setAttribute("class", "cardName titleCheked")
        else
            cardTitleP.setAttribute("class", "cardName")

        cardTitleP.innerHTML = item.note

        // const toolTipSpan  = document.createElement("span")
        // toolTipSpan.setAttribute("class","tooltiptext")
        // toolTipSpan.innerHTML = item.note

        // cardTitleP.appendChild(toolTipSpan)

        const cardTitleButton = document.createElement("button")
        cardTitleButton.setAttribute("class", "hide")
        cardTitleButton.innerText = "X"
        cardTitleButton.addEventListener("click", DeleteNote, false)
        cardTitleButton.myId = item.id;

        const cardTitleBr = document.createElement("br")

        cardTitle.appendChild(cardTitleP)
        cardTitle.appendChild(cardTitleButton)

        const cardDescription = document.createElement("p")
        if (item.checked)
            cardDescription.setAttribute("class", "card-text titleCheked")
        else
            cardDescription.setAttribute("class", "card-text")

        cardDescription.innerHTML = item.description

        const cardInsertTimeP = document.createElement("p")
        if (item.checked)
            cardInsertTimeP.setAttribute("class", "card-text titleCheked")
        else
            cardInsertTimeP.setAttribute("class", "card-text")


        let newDate = new Date(item.date + " @ " + item.time)
        cardInsertTimeP.innerHTML = "Due Date : " + FormateDate(newDate)

        const cardDueDateP = document.createElement("p")
        if (item.checked)
            cardDueDateP.setAttribute("class", "inserttimetext titleCheked")
        else
            cardDueDateP.setAttribute("class", "inserttimetext")


        cardDueDateP.innerHTML = item.inserttime;

        const cardFooter = document.createElement("div")
        cardFooter.setAttribute("class", "footer-button")

        const cardFooterBtn1 = document.createElement("button")
        cardFooterBtn1.setAttribute("class", "btn btn-secondary")
        cardFooterBtn1.innerHTML = "Edit"
        cardFooterBtn1.addEventListener("click", EditNote, false)
        cardFooterBtn1.myId = item.id;

        const cardFooterBtn2 = document.createElement("button")
        cardFooterBtn2.setAttribute("class", "btn btn-secondary")
        cardFooterBtn2.innerHTML = item.checked ? "Re-Add" : "Done"
        cardFooterBtn2.addEventListener("click", DoneNote, false)
        cardFooterBtn2.myId = item.id;



        cardFooter.appendChild(cardFooterBtn1)
        cardFooter.appendChild(cardFooterBtn2)


        cardBody.appendChild(cardTitle)
        cardBody.appendChild(cardTitleBr)
        cardBody.appendChild(cardDescription)
        cardBody.appendChild(cardInsertTimeP)
        cardBody.appendChild(cardFooter)
        cardBody.appendChild(cardDueDateP)



        cardBox.appendChild(cardBody)

        cardsContainer.appendChild(cardBox)

    }
}

function DeleteNote(evt) {
    let note = FindNoteOfId(evt.currentTarget.myId)
    if (note != 0) {
        let index = Notes.indexOf(note)
        Notes.splice(index, 1)
    }
    const stringifyProducts = JSON.stringify(Notes)
    localStorage.setItem("notes", stringifyProducts)
    drawCards()
}
function EditNote(evt) {
    let note = FindNoteOfId(evt.currentTarget.myId)
    if (note != 0) {
        note.ineditmode = true;
        FillForm(note)
    }
}

function FillForm(note) {
    noteId.value = note.note
    noteError.innerHTML = ""
    noteDesciptionId.value = note.description
    descriptionError.innerHTML = ""

    // strDate = note.date.toISOString().split('T')[0]

    // const [year, month, day] = strDate.split('-');
    // const date = new Date(+year, month - 1, +day+1);


    dueDateId.value = note.date//date.toISOString().split('T')[0]

    dateError.innerHTML = ""
    dueTimeId.value = note.time
    timeError.innerHTML = ""
    noteid.innerHTML = note.id


    formTitle.innerHTML = "Edit Task"
    buttonAdd.innerHTML = "Update"

    $('html,body').scrollTop(0);

}

function DoneNote(evt) {
    let note = FindNoteOfId(evt.currentTarget.myId)
    if (note != 0) {
        note.checked = !note.checked
    }
    const stringifyProducts = JSON.stringify(Notes)
    localStorage.setItem("notes", stringifyProducts)
    drawCards()

}

function FindNoteOfId(id) {
    for (const n of Notes)
        if (n.id == id)
            return n

    return 0
}

function GetCurDate() {
    let currentdate = new Date();
    return "Added At: " + FormateDate(currentdate);
}


function FormateDate(currentdate) {
    let datetime = currentdate.getDate() + "/"
        + (currentdate.getMonth() + 1) + "/"
        + currentdate.getFullYear() + " @ "
        + currentdate.getHours() + ":"
        + (currentdate.getMinutes() < 10 ? '0' : '') + currentdate.getMinutes()

    //currentdate.getMinutes() 
    // + ":"
    // + currentdate.getSeconds();
    return datetime;
}

function AddDemoData() {
    Notes = [];
    Id = 0;

    let note = {
        id: Id++,
        note: "Get Milk",
        description: "Two Cartons 2 litter",
        date: "2022-12-31",
        time: "12:00",
        checked: true,
        inserttime: GetCurDate(),
    }

    Notes.push(note)

    note = {
        id: Id++,
        note: "Fix Car",
        description: "Mandatory",
        date: "2023-01-15",
        time: "10:10",
        checked: false,
        inserttime: GetCurDate(),
    }

    Notes.push(note)

    note = {
        id: Id++,
        note: "Pick Kids",
        description: "School",
        date: "2022-10-29",
        time: "02:30",
        checked: true,
        inserttime: GetCurDate(),
    }

    Notes.push(note)


    note = {
        id: Id++,
        note: "Doctor Appointment",
        description: "Back Pain Check",
        date: "2023-03-01",
        time: "09:30",
        checked: false,
        inserttime: GetCurDate(),
    }

    Notes.push(note)

    note = {
        id: Id++,
        note: "Mom Birthday",
        description: "Get Gift and Flowers",
        date: "2023-04-01",
        time: "08:00",
        checked: false,
        inserttime: GetCurDate(),
    }

    Notes.push(note)

    note = {
        id: Id++,
        note: "Aniversary",
        description: "Get Gift and Flowers",
        date: "2023-02-14",
        time: "10:00",
        checked: false,
        inserttime: GetCurDate(),
    }

    Notes.push(note)


    const stringifyProducts = JSON.stringify(Notes)
    localStorage.setItem("notes", stringifyProducts)
    ClearNotes()
    drawCards()

}

function SetCurrentView(filter) {
    currentView = filter;

    let btn = document.getElementById('f1')
    btn.setAttribute("class","btn btn-dark")
    btn = document.getElementById('f2')
    btn.setAttribute("class","btn btn-dark")
    btn = document.getElementById('f3')
    btn.setAttribute("class","btn btn-dark")
    btn = document.getElementById('f4')
    btn.setAttribute("class","btn btn-dark")


    let id = 'f1'
    switch (currentView) {
        case 'All':
            id = 'f1'
            break;
        case 'Done':
            id = 'f2'
            break;
        case 'NotDone':
            id = 'f3'
            break;
        case 'Summary':
            id = 'f4'
            break;
    }

    btn = document.getElementById(id)
    btn.setAttribute("class","btn btn-dark btnfocus")

    drawCards();
}


function drawSummary() {

    cardsContainer.innerHTML = ""

    let DoneArr = []
    let UnDoneArr = []

    for (const item of Notes) {

        if (item.checked) {
            DoneArr.push(item.note)
        }
        else {
            UnDoneArr.push(item.note)
        }
    }

    const summaryTitle = document.createElement("div")
    summaryTitle.setAttribute("class", "summarytabletitle fade-in-div")
    summaryTitle.innerHTML = `There are ${UnDoneArr.length} Tasks Not Done out of ${Notes.length}`
    cardsContainer.appendChild(summaryTitle)


    const summaryTable = document.createElement("table")
    summaryTable.setAttribute("class", "table table-striped table-dark fade-in-div")

    const thead = document.createElement("thead")
    const tr = document.createElement("tr")
    const th1 = document.createElement("th")
    th1.setAttribute("scope", "col")
    th1.innerHTML = "#"

    const th2 = document.createElement("th")
    th2.setAttribute("scope", "col")
    th2.innerHTML = "ID"

    const th3 = document.createElement("th")
    th3.setAttribute("scope", "col")
    th3.innerHTML = "Task"

    const th4 = document.createElement("th")
    th4.setAttribute("scope", "col")
    th4.innerHTML = "Due Date"

    const th5 = document.createElement("th")
    th5.setAttribute("scope", "col")
    th5.innerHTML = "Status"

    tr.appendChild(th1)
    //tr.appendChild(th2)
    tr.appendChild(th3)
    tr.appendChild(th4)
    tr.appendChild(th5)

    thead.appendChild(tr)

    summaryTable.appendChild(thead)

    const tbody = document.createElement("tbody")

    let id = 0;
    for (const item of Notes) {
        id++;
        const trBody = document.createElement("tr")
        const thBody = document.createElement("th")
        thBody.setAttribute("scope", "row")
        thBody.innerHTML = id
        const tdBody1 = document.createElement("td")
        tdBody1.innerHTML = id
        const tdBody2 = document.createElement("td")
        tdBody2.innerHTML = item.note
        const tdBody3 = document.createElement("td")
        tdBody3.innerHTML = item.date + " @ " + item.time
        const tdBody4 = document.createElement("td")
        tdBody4.innerHTML = (item.checked ? "Done" : "Not Done")

        trBody.appendChild(thBody)
        //trBody.appendChild(tdBody1)
        trBody.appendChild(tdBody2)
        trBody.appendChild(tdBody3)
        trBody.appendChild(tdBody4)

        tbody.appendChild(trBody)
    }

    summaryTable.appendChild(tbody)
    cardsContainer.appendChild(summaryTable)
}

