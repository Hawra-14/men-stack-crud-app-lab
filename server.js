const dotenv = require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
const path = require('path')
const methodOverride = require('method-override')

const app = express()

// connnect us to MongoDB using connection string in .env
mongoose.connect(process.env.MONGODB_URI)
mongoose.connection.on('connected', () => { // This is like a console.log it is for us to know that it is connected
    console.log(`Connected to MongoDB ${mongoose.connection.name} 🥭`)
})

const Book = require('./models/books.js')

app.use(express.urlencoded({ extended: false }))
app.use(methodOverride('_method'))
app.use(morgan('dev'))
app.use(express.static(path.join(__dirname, "public")))

app.get('/', (req, res) => {
    res.render('test.ejs')
})

app.get('/book/new', async (req, res) => {
    res.render('new.ejs')
})

app.post('/books', async (req, res) => {
    const bookData = {}

    bookData.title = req.body.title
    bookData.author = req.body.author
    bookData.status = req.body.status
    bookData.rate = req.body.rate
    bookData.review = req.body.review

    const createdBook = await Book.create(bookData)
    // res.send(createdBook)
    res.redirect('/books')
})

app.get('/books', async (req, res) => {
    let allBooks = await Book.find()
    console.log(allBooks)
    res.render('index.ejs', {
        allBooks: allBooks,
    })
})

app.get('/books/:bookId', async (req, res) => {
    let foundBook = await Book.findById(req.params.bookId)
    console.log(foundBook._id)
    res.render('show.ejs', {
        foundBook: foundBook
    })
})

app.delete('/books/:bookId', async (req, res) => {
    await Book.findByIdAndDelete(req.params.bookId)
    res.redirect('/books')
})

app.get('/books/:bookId/edit', async (req, res) => {
    let foundBook = await Book.findById(req.params.bookId)
    res.render('edit.ejs', {
        foundBook: foundBook,
    })
})

app.put('/books/:bookId', async (req, res) => {
    const bookData = {}
    bookData.title = req.body.title
    bookData.author = req.body.author
    bookData.status = req.body.status
    bookData.rate = req.body.rate
    bookData.review = req.body.review


    let UpdatedBook = await Book.findByIdAndUpdate(req.params.bookId, bookData, { new: true })
    res.redirect(`/books/${req.params.bookId}`)
})

app.listen(3000, () => {
    console.log('Listening on port 3000 📚')
})