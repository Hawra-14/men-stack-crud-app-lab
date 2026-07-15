const mongoose = require('mongoose')

const bookSchema = new mongoose.Schema({
    title: String,
    author: String,
    status: String, // want to read, currently reading, read, and DNF
    rate: Number, // 1-5 stars
    review: String, // rating message
})

const Book = mongoose.model('Book', bookSchema)

module.exports = Book
