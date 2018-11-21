const express = require('express');
const Joi = require('joi');

// Example in memory data structure for simplicity.
let genres = [
    { id: 1, name: 'Classical' },
    { id: 2, name: 'Jazz' },
    { id: 3, name: 'Rock' }
]

const app = express();

const genre_uri = '/api/genres';
app.get(genre_uri, (req, res) => {
    res.send(genres);
});

app.post(genre_uri, (req, res) => {
    // todo input validation
    // todo append new body to list
});

app.put(genre_uri + '/:id', (req, res) => {
    // todo validate input
    // todo modify the document
    // todo 
});

app.delete(genre_uri + '/:id', (req, res) => {
    // todo validate that the record exists
    // delete the record
})

// This is how you set a port from an environment variable
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})
