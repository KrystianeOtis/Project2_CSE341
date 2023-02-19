const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;
const validateBook = require('../helper');

const getAll = async (req, res) => {
  try{
  const result = await mongodb
    .getDb()
    .db('booksDB')
    .collection('books')
    .find();
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  });
  } catch (error){
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching books' });
  }
};


const getSingle = async (req, res) => {
  try {
    const bookId = new ObjectId(req.params.id);
    const result = await mongodb
      .getDb()
      .db('booksDB')
      .collection('books')
      .find({ _id: bookId });
    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists[0]);
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching a book' });
  }
};


const getAddBook = async (req, res) => {
  try {
    const book = {
      title: req.body.title,
      author: req.body.author,
      genre: req.body.genre,
      isbn: req.body.isbn
    };
    const errors = validateBook.validateBook(book);
      if (errors === undefined) {
      const response = await mongodb.getDb().db('booksDB').collection('books').insertOne(book);
      if (response.acknowledged) {
        res.status(201).json(response);
      } else {
        res.status(500).json({ error: 'An error occurred while creating the book' });
      }
  }
  else {
    throw errors.details;
  }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while creating the book' });
  }
};

const updateBook = async (req, res) => {
  try {
    const bookId = new ObjectId(req.params.id);
    const book = {
      title: req.body.title,
      author: req.body.author,
      genre: req.body.genre,
      isbn: req.body.isbn
    };
    const errors = validateBook.validateBook(book);
    if (errors === undefined) {
      const response = await mongodb.getDb().db('booksDB').collection('books').insertOne(book);
      if (response.acknowledged) {
        res.status(201).json(response);
      } else {
        res.status(500).json({ error: 'An error occurred while updating the book' });
      }
    }
    const response = await mongodb
      .getDb()
      .db('booksDB')
      .collection('books')
      .replaceOne({ _id: bookId }, book);
    console.log(response);
    if (response.modifiedCount > 0) {
      res.status(204).send();
    }
    else {
      throw errors.details;
  }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while creating the book' });
  }
};

const deleteBook = async (req, res) => {
  try {
    const bookId = new ObjectId(req.params.id);
    const response = await mongodb.getDb().db('booksDB').collection('books').deleteOne({ _id: bookId });
    if (response.deletedCount > 0) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: "The book with the given ID was not found." });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while deleting the book' });
  }
};

module.exports = {
  getAll,
  getSingle,
  getAddBook,
  updateBook,
  deleteBook
};


