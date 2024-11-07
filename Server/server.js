const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;
let path = require('path');

app.use(cors());
app.use(express.json());

app.get('/clubs', (req, res) => {
    res.sendFile(path.join(__dirname, '../Client/pages/clublisting/clublisting.html'));
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});