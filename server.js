//  all requires
const express = require('express');
const path = require('path');
const fs = require('fs');

//`app` variable set to the value of `express()`.
const app = express();
const PORT = process.env.port || 3001;

app.use(express.json());//my middleware
app.use(express.urlencoded({ extended: true }));//taken from notes
//Invoke app.use() and serve static files from the '/public' folder
app.use(express.static('public'));
//* `GET *` should return the `index.html` file.
app.get('/', (req, res) => res.sendFile(path.join(__dirname, './public/index.html')));

//route that will serve up the `public/notes.html` page
app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, './public/notes.html')));

// `GET /api/notes` should read the `db.json` file and return all saved notes as JSON.
app.get('/api/notes', (req, res) => res.sendFile(path.join(__dirname, "./db/db.json")));

//* `POST /api/notes` should receive a new note to save on the request body, add it to the `db.json` file, 
//and then return the new note to the client. 
app.post('/api/notes', (req, res) => {//new notes can be made
  let newNote = req.body;
  let noteList = JSON.parse(fs.readFileSync('./db/db.json', 'utf-8'));
  let noteLength = (noteList.length).toString();
  newNote.id = noteLength;
  noteList.push(newNote);//pushing it to notes
  fs.writeFileSync('./db/db.json', JSON.stringify(noteList));
  res.json(noteList);
})

app.delete('/api/notes/:id', (req, res) => {//deletes notes
  let noteList = JSON.parse(fs.readFileSync('./db/db.json', 'utf-8'));
  let noteId = (req.params.id).toString();
  noteList = noteList.filter(selected => {
    return selected.id != noteId;
  })
  fs.writeFileSync('./db/db.json', JSON.stringify(noteList));
  res.json(noteList)
}
);

app.listen(PORT, () => console.log(`App listening at http://localhost:${PORT} 🚀`));
