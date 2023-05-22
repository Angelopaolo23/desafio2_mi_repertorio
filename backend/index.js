const express = require('express');
const app = express();
const fs = require('fs');
const PORT = 3000;
app.use(express.json());
app.listen(PORT, console.log(`Servidor encendido en puerto ${PORT}!`));


app.get('/canciones', (req, res) => {
    const repertorio = JSON.parse(fs.readFileSync('repertorio.json'));
    res.json(repertorio)
});

app.post('/canciones', (req, res) => {
    const cancion = req.body;
    const repertorio = JSON.parse(fs.readFileSync('repertorio.json'));
    repertorio.push(cancion);
    fs.writeFileSync('repertorio.json', JSON.stringify(repertorio));
    res.send('Cancion agregada exitosamente!')
});

app.delete('/canciones/:id', (req, res) => {
    const { id } = req.params;
    const repertorio = JSON.parse(fs.readFileSync('repertorio.json'));
    const index = repertorio.findIndex(p => p.id == id);
    repertorio.splice(index, 1);
    fs.writeFileSync('repertorio.json', JSON.stringify(repertorio));
    res.send('Cancion eliminada correctamente')
});

app.put('/canciones/:id', (req, res) => {
    const {id } = req.params;
    const cancionEditada = req.body;
    const repertorio = JSON.parse(fs.readFileSync('repertorio.json'));
    const index = repertorio.findIndex(p => p.id == id);
    repertorio[index] = cancionEditada;
    fs.writeFileSync('repertorio.json', JSON.stringify(repertorio));
    res.send('Cancion editada correctamente')
});

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
});