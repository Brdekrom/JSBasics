import express from 'express'
import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import User from './user.js'
import { expressjwt } from 'express-jwt'

mongoose.connect('mongodb+srv://brdekrom:LaClaveDeMongo123@cluster0.04c7q.mongodb.net/auth?retryWrites=true&w=majority')

const app = express()

app.use(express.json())

console.log()
const validateJwt = expressjwt({ secret: process.env.SECRET, algorithms: ['HS256'] })
const singToken = _id => jwt.sign({ _id }, process.env.SECRET)

app.post('/register', async (req, res) => {
    const { body } = req
    console.log({ body })
    try {
        const isUser = await User.findOne({ email: body.email })
        if (isUser) {
            return res.status(403).send('usuario ya existe')
        }
        const salt = await bcrypt.genSalt()
        const hashed = await bcrypt.hash(body.password, salt)
        const user = await User.create({ email: body.email, password: hashed, salt })
        const signed = singToken(user._id)
        res.status(201).send(signed)

    } catch (err) {
        console.log(err)
        res.status(500).send(err.message)
    }
})

app.post('/login', async (req, res) => {
    const { body } = req
    try {
        const user = await User.findOne({ email: body.email })
        if (!user) {
            res.status(403).send('usuario y/o contraseña invalida')
        } else {
            const isMatch = await bcrypt.compare(body.password, user.password)
            if (isMatch) {
                const signed = singToken(user._id)
                res.status(200).send(signed)
            } else {
                res.status(403).send('usuario y/o contraseña invalida')
            }
        }

    } catch (error) {
        res.status(500).send(err.message);
    }
})

const findAndAssignUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.auth._id)
        if (!user) {
            return res.status(401).end()
        }
        req.auth = user
        next()
    } catch (e) {
        next(e)
    }
}

const isAuthenticaded = express.Router().use(validateJwt, findAndAssignUser)
app.get('/lele', isAuthenticaded, (req, res) => {
    res.send(req.auth)
})

app.use((err,req,res,next) => {
    console.log('Mi nuevo error es', err.stack)
    next(err)
})
app.use((err,req,res,next) => {
    res.sed('Ha ocurrido un error :(')
})

app.listen(3000, () => {
    console.log('http://localhost:3000')
})