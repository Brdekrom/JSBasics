import express from 'express';
import mongoose from 'mongoose';
import Animal from './animal.controller.js'
import path from 'path';
const __dirname = path.resolve();
mongoose.connect('mongodb+srv://brdekrom:LaClaveDeMongo123@cluster0.04c7q.mongodb.net/animals?retryWrites=true&w=majority')
const app = express();
const port = 3000;

app.use(express.json())
app.use(express.static('app'))

app.get('/animals',Animal.list)
app.post('/animals',Animal.create)
app.get('/animals/:id',Animal.get)
app.put('/animals/:id', Animal.update)
app.patch('/animals/:id', Animal.update)
app.delete('/animals/:id',Animal.destroy)

app.get('/', (req,res) => {
    res.sendFile(`${__dirname}/index.html`)
})

app.get('*', (req,res) => {
    res.status(404).send('esta pagina no existe')
})
app.post('*', (req,res) => {
    res.status(404).send('esta pagina no existe')
})
app.listen(port, () => {
    console.log('Arrancando la aplicacion, http://localhost:3000')
})