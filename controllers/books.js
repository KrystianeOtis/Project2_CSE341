const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
  const result = await mongodb
    .getDb()
    .db('booksDB')
    .collection('books')
    .find();
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  });
};

const getSingle = async (req, res) => {
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
};


const getAddBook = async (req, res) => {
const book = {
    title: req.body.title,
    author: req.body.author,
    genre: req.body.genre,
    isbn: req.body.isbn
  };
  const response = await mongodb.getDb().db('booksDB').collection('books').insertOne(book);
  if (response.acknowledged) {
    res.status(201).json(response);
  } else {
    res.status(500).json(response.error || 'Some error occurred while creating the book.');
  }
};

const updateBook = async (req, res) => {
  const bookId = new ObjectId(req.params.id);
  // be aware of updateOne if you only want to update specific fields
  const book = {
    title: req.body.title,
    author: req.body.author,
    genre: req.body.genre,
    isbn: req.body.isbn
  };
  const response = await mongodb
    .getDb()
    .db('booksDB')
    .collection('books')
    .replaceOne({ _id: bookId }, book);
  console.log(response);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while updating the book.');
  }
};

const deleteBook = async (req, res) => {
  const bookId = new ObjectId(req.params.id);
  const response = await mongodb.getDb().db('booksdb').collection('books').remove({ _id: bookId }, true);
  console.log(response);
  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while deleting the book.');
  }
};

module.exports = {
  getAll,
  getSingle,
  getAddBook,
  updateBook,
  deleteBook
};


