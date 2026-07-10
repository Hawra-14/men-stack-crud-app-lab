const dotenv = require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')

const app = express()

// connnect us to MongoDB using connection string in .env
mongoose.connect(process.env.MONGODB_URI)
mongoose.connection.on('connected', () => { // This is like a console.log it is for us to know that it is connected
    console.log(`Connected to MongoDB ${mongoose.connection.name} 🥭`)
})

const Book = require('./models/books.js')

app.use(express.urlencoded({ extended: false })) 
app.use(morgan('dev'))

app.get('/', (req, res) => {
    res.render('test.ejs')
})

app.get('/book/new', async (req, res) => {
    res.render('new.ejs')
})

app.post('/books', async (req, res) => {
    const bookData = {}

    bookData.title = req.body.title
    bookData.auther = req.body.auther
    bookData.status = req.body.status
    bookData.rate = req.body.rate
    bookData.review = req.body.review

    const createdBook = await Book.create(bookData)
    res.send(createdBook)
    // res.redirect('/')
})


app.listen(3000, () => {
    console.log('Listening on port 3000 📚')
})