//  all requires
const express = require('express');
const path = require('path');
const notes = require('./db/db.json');
const fs = require('fs');

//`app` variable set to the value of `express()`.**
const app = express();
const PORT = process.env.port || 3001;

app.use(express.json());//my middleware
app.use(express.urlencoded({ extended: true }));//taken from notes
//Invoke app.use() and serve static files from the '/public' folder**
app.use(express.static('public'));

// The following HTML routes should be created:

// * `GET /notes` should return the `notes.html` file.

// * `GET *` should return the `index.html` file.

// The following API routes should be created:

// * `GET /api/notes` should read the `db.json` file and return all saved notes as JSON.

// * `POST /api/notes` should receive a new note to save on the request body, add it to the `db.json` file, and then return the new note to the client. You'll need to find a way to give each note a unique id when it's saved (look into npm packages that could do this for you).

app.get('/', (req, res) => res.sendFile(path.join(__dirname, './public/index.html')));

//route that will serve up the `public/notes.html` page
app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, './public/notes.html')));


app.get('/api/notes', (req, res) => res.sendFile(path.join(__dirname, "./db/db.json")));

app.post('/api/notes', (req, res) => {
  let newNote = req.body;
  let noteList = JSON.parse(fs.readFileSync('./db/db.json', 'utf-8'));
  let noteLength = (noteList.length).toString();
  newNote.id = noteLength;
  noteList.push(newNote);
  fs.writeFileSync('./db/db.json', JSON.stringify(noteList));
  res.json(noteList);
})


app.listen(PORT, () => console.log(`App listening at http://localhost:${PORT} 🚀`));


//from notes **