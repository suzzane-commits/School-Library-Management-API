const Book = require('../models/Book');
const Student = require('../models/Student');
const Attendant = require('../models/Attendant');
const generateISBN = require('../utils/generateISBN');
// CREATE BOOK
exports.createBook = async (req, res) => {
  try {
    const { title, authors } = req.body;

    if (!title) {
      return res.status(400).json({
        message: "Title is required"
      });
    }
    let isbn;
        let exists = true;
    
        while (exists) {
          isbn = generateISBN();
          const found = await Book.findOne({ isbn });
          if (!found) exists = false;
        }
    
    const book = await Book.create({
      title,
      isbn,
      authors
    });

    const populatedBook = await Book.findById(book._id)
      .populate("authors")
      .populate("borrowedBy")
      .populate("issuedBy");

    res.status(201).json({
      message: "Book Created Successfully",
      data: populatedBook
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// GET ALL BOOKS
exports.getAllBooks = async (req, res) => {
  try {
    const books = await Book.find()
      .populate("authors")
      .populate("borrowedBy")
      .populate("issuedBy");

    res.status(200).json(books);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// GET BOOK BY ID
exports.getOneBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id)
      .populate("authors")
      .populate("borrowedBy")
      .populate("issuedBy");

    if (!book) {
      return res.status(404).json({
        message: "Book not found"
      });
    }

    res.status(200).json(book);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// GET BOOK BY TITLE(Bonus Option to make navigation easier)
exports.getBookByTitle = async (req, res) => {
  try {
    const book = await Book.findOne({
      title: { $regex: req.params.title, $options: "i" }
    })
      .populate("authors")
      .populate("borrowedBy")
      .populate("issuedBy");

    if (!book) {
      return res.status(404).json({
        message: "Book not found"
      });
    }

    res.status(200).json(book);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE BOOK 
exports.updateBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({
        message: "Book not found"
      });
    }

    const { title, isbn, authors, status } = req.body;

    if (book.status === "OUT" && status === "IN") {
      return res.status(400).json({
        message: "Cannot manually mark borrowed book as IN. Use return endpoint."
      });
    }

    if (status && !["IN", "OUT"].includes(status)) {
      return res.status(400).json({
        message: "Invalid status value"
      });
    }

    if (title) book.title = title;
    if (isbn) book.isbn = isbn;
    if (authors) book.authors = authors;
    if (status) book.status = status;

    await book.save();

    res.status(200).json({
      message: "Book updated successfully",
      book
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// BORROW BOOK
exports.borrowBook = async (req, res) => { 
  try {
    const { studentId, staffId, returnDate } = req.body;

    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    if (book.status === "OUT") {
      return res.status(400).json({
        message: "Book already borrowed"
      });
    }

    if (!studentId || !staffId) {
      return res.status(400).json({
        message: "Student and Attendant are required"
      });
    }

    const student = await Student.findById(studentId);
    if (!student) {
      return res.status(400).json({
        message: "Invalid student ID"
      });
    }

    const attendant = await Attendant.findById(staffId);
    if (!attendant) {
      return res.status(400).json({
        message: "Invalid staff ID"
      });
    }

    book.status = "OUT";
    book.borrowedBy = student._id;
    book.issuedBy = attendant._id;
    book.returnDate = returnDate || null;

    await book.save();

    await book.populate("borrowedBy issuedBy authors");

    res.status(200).json({
      message: "Book borrowed successfully",
      data: book
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// RETURN BOOK
exports.returnBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    if (book.status === "IN") {
      return res.status(400).json({
        message: "Book is already available"
      });
    }

    book.status = "IN";
    book.borrowedBy = null;
    book.issuedBy = null;
    book.returnDate = null;

    await book.save();

    await book.populate("borrowedBy issuedBy authors");

    res.status(200).json({
      message: "Book returned successfully",
      data: book
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE BOOK
exports.deleteBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({
        message: "Book not found"
      });
    }

    if (book.status === "OUT") {
      return res.status(400).json({
        message: "Cannot delete a borrowed book"
      });
    }

    await Book.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Book deleted successfully",
      data:book
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};