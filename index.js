const express = require('express');
const app = express();
const PORT = 3000;

//Middleware to serve static files from public folder
app.use(express.static('public'));
app.use(express.json());

//Route for hamepage
app.get('/', (req, res) => {res.sendFile(_dirname + '/public/index.html');});

//start the server
app.listen(PORT, () => { console.log(`Farmers App running at http:/localhost:${PORT}`);});  