const express = require('express');
const genres = require('./routes/genre');

const app = express();
app.use(express.json());
app.use('/api/genres', genres);


// This is how you set a port from an environment variable
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})
