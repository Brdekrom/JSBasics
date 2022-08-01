import express from 'express';
import mongoose from 'mongoose';
import user from './user.controller.js'
import path from 'path';
const __dirname = path.resolve();
mongoose.connect('mongodb+srv://brdekrom:LaClaveDeMongo123@cluster0.04c7q.mongodb.net/miapp?retryWrites=true&w=majority')
const app = express();
const port = 3000;

app.use(express.json())
app.use(express.static('app'))

app.get('/users',user.list)
app.post('/users',user.create)
app.get('/users/:id',user.get)
app.put('/users/:id', user.update)
app.patch('/users/:id', user.update)
app.delete('/users/:id',user.destroy)

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