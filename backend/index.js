const express = require('express');
const app = express();
const fs = require('fs');
const PORT = 3000;
app.use(express.json());
app.listen(PORT, console.log(`Servidor encendido en puerto ${PORT}!`));




app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
});