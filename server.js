const express = require('express');

const app = express();
app.use(express.json());

// Sample book collection
let books = [
    {
        id: 1,
        title: "Wings of Fire",
        author: "A.P.J. Abdul Kalam"
    },
    {
        id: 2,
        title: "The Alchemist",
        author: "Paulo Coelho"
    }
];

// CREATE - Add a new book
app.post('/books', (req, res) => {
    const newBook = {
        id: Date.now(),
        title: req.body.title,
        author: req.body.author
    };

    books.push(newBook);
    res.status(201).json(newBook);
});

// READ - Get all books
app.get('/books', (req, res) => {
    res.json(books);
});

// READ - Get a book by ID
app.get('/books/:id', (req, res) => {
    const book = books.find(b => b.id === Number(req.params.id));

    if (!book) {
        return res.status(404).json({ message: "Book not found" });
    }

    res.json(book);
});

// UPDATE - Update a book
app.put('/books/:id', (req, res) => {
    const book = books.find(b => b.id === Number(req.params.id));

    if (!book) {
        return res.status(404).json({ message: "Book not found" });
    }

    book.title = req.body.title ?? book.title;
    book.author = req.body.author ?? book.author;

    res.json(book);
});

// DELETE - Delete a book
app.delete('/books/:id', (req, res) => {
    const index = books.findIndex(b => b.id === Number(req.params.id));

    if (index === -1) {
        return res.status(404).json({ message: "Book not found" });
    }

    const deletedBook = books.splice(index, 1);

    res.json({
        message: "Book deleted successfully",
        book: deletedBook[0]
    });
});

// Start server
app.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});
