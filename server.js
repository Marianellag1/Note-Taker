//  all requires
const express = require('express');
const path = require('path');
const api = require('./routes/htmlRoute');
//requiring the json file with notes
const notes = require('./db/db.json');
// const apiRoutes = require('./routes/apiRoute');
// const htmlRoutes = require('./routes/htmlRoute');

//`app` variable set to the value of `express()`.**
const app = express();
const PORT = process.env.port || 3001;

app.use(express.json());//my middleware
app.use(express.urlencoded({ extended: true }));//taken from notes
// app.use('/api', api);
//Invoke app.use() and serve static files from the '/public' folder**
app.use(express.static('public'));

// The following HTML routes should be created:

// * `GET /notes` should return the `notes.html` file.

// * `GET *` should return the `index.html` file.

// The following API routes should be created:

// * `GET /api/notes` should read the `db.json` file and return all saved notes as JSON.

// * `POST /api/notes` should receive a new note to save on the request body, add it to the `db.json` file, and then return the new note to the client. You'll need to find a way to give each note a unique id when it's saved (look into npm packages that could do this for you).

app.get('/', (req, res) => res.send(path.join(__dirname, '/public/index.html')));

//route that will serve up the `public/notes.html` page
app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, '/public/notes.html')));

// res.json() allows us to return JSON instead of a buffer, string, or static file**
app.get('/api', (req, res) => res.json(notes));
// app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, '/db/db.json')));

app.get('/api/notes', (req, res) => {
  // Log our request to the terminal
  console.info(`${req.method} request received to get notes`);//this is definetly working

  // Sending all reviews to the client
  return res.status(200).json(notes);
});

app.get('/api/notes/:id', (req, res) => {
  if (req.params.id) {
    console.info(`${req.method} request received to get a single a review`);
    const notesId = req.params.id;
    for (let i = 0; i < notes.length; i++) {
      const currentNotes = notes[i];
      if (currentNotes.notesId === notesId) {
        res.status(200).json(currentNotes);
        return;
      }
    }
    res.status(404).send('Review not found');
  } else {
    res.status(400).send('Review ID not provided');
  }
});

app.listen(PORT, () => console.log(`App listening at http://localhost:${PORT} 🚀`));


//from notes **