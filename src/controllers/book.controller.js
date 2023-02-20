const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { bookService } = require('../services');

const createBook = catchAsync(async (req, res) => {
  // eslint-disable-next-line no-console
  console.log(req.files, 'request from postmam');

  const book = await bookService.createBook(req.body);
  // eslint-disable-next-line no-console
  console.log(book, 'created book');
  res.status(httpStatus.CREATED).send(book);
});

const getBooks = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await bookService.queryBook(filter, options);
  res.send(result);
});

const getBook = catchAsync(async (req, res) => {
  const user = await bookService.getBookById(req.params.bookId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Book not found');
  }
  res.send(user);
});

const updateBook = catchAsync(async (req, res) => {
  const user = await bookService.updateBookById(req.params.bookId, req.body);
  res.send(user);
});

const deleteBook = catchAsync(async (req, res) => {
  await bookService.deleteBookById(req.params.bookId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createBook,
  getBooks,
  getBook,
  updateBook,
  deleteBook,
};
