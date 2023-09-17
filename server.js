const express = require('express');
const path = require('path');
const { clog } = require('./middleware/clog');
const api = require('./routes/index.js');

const PORT = process.env.PORT || 3001;

const app = express();

// Import custom middleware, "cLog"
app.use(clog);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', api);

app.use(express.static('public'));

// request for homepage
app.get('/', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/index.html'))
);

// GET request for notes page
app.get('/notes', (req, res) => {
    // Take to notes page
    res.sendFile(path.join(__dirname, '/public/notes.html'))

});

// Wildcard route to direct users to a 404 page
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);
