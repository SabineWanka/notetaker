var express = require('express');
var app = express();
var fs = require("fs");
var port = 3050;
var path = require("path");

// reading j.son file and storing content 
let notes = require("./db/db.json");

// defining error funktion
var errorFn = function (err) {
    if (err) throw err;
};

// Setting up the Express app to handle data parsing and static files 
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname + "/public"));

// Bulidung the routes
// getting the homepage 
app.get('/', function (req, res) {

    res.sendFile(path.join(__dirname, "/index.html"))
})

// getting the notes page
app.get('/notes', function (req, res) {

    res.sendFile(path.join(__dirname, "/notes.html"))
})

// getting the api for notes and display all notes
app.get("/api/notes", function (req, res) {
    return res.json(notes);
});

// adding a new note und giving this note a specific ID, the ID is a number between 0 and 1000
app.post("/api/notes", function (req, res) {
    var newNote = req.body;
    notes.push(newNote);
    newNote.id = Math.floor(Math.random() * 1000);
    fs.writeFile("./db/db.json", JSON.stringify(notes), errorFn);
    return res.json(NewNote);
});

// deleting a note with an specific id 
app.delete("./api/notes/:id", function (req, res) {
    var noteID = req.params.id;
    for (var i = 0; i < notes.length; i++) {
        if (noteID == notes[i].id) {
            notes.splice(i, 1);
            fs.writeFile("./db/db.json", JSON.stringify(notes), errorFn);
            return res.json(notes);
        }
    }
});

// Server listening 
app.listen(port, function () {
    console.log("App listening on port" + port)
});
