const express = require('express')
const app = express()
const port = 3050
const path = require("path")

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Notes 

var notes = [

];

app.get('/', function (req, res) {

    res.sendFile(path.join(__dirname, "index.html"))
})

app.get('/notes', function (req, res) {

    res.sendFile(path.join(__dirname, "notes.html"))
})

// Displays all notes
app.get("/api/notes", function (req, res) {
    return res.json(notes);
});

// Adding new notes 
app.post("/api/notes", function (req, res) {
    var newNotes = req.body;
    newNotes.routeName = newNotes.name.replace(/\s+/g, "").toLowerCase();
    console.log(newNotes);
    notes.push(newNotes);
    return res.json(NewNotes);
});


// Server listening 
app.listen(port, function () {
    console.log("App listening on port" + port)
});
