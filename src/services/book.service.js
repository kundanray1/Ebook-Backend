const httpStatus = require('http-status');
const { Book } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a user
 * @param {Object} bookBody
 * @returns {Promise<User>}
 */
const createBook = async (bookBody) => {
  // if (await Book.isNameTaken(bookBody.name)) {
  //   throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  // }
  return Book.create(bookBody);
};

/**
 * Query for books
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryBook = async (filter, options) => {
  const books = await Book.paginate(filter, options);
  return books;
};

/**
 * Get user by id
 * @param {ObjectId} id
 * @returns {Promise<User>}
 */
const getBookById = async (id) => {
  return Book.findById(id);
};

/**
 * Get user by email
 * @param {string} email
 * @returns {Promise<User>}
 */
const getBookByName = async (name) => {
  return Book.findOne({ name });
};

/**
 * Update user by id
 * @param {ObjectId} bookId
 * @param {Object} updateBody
 * @returns {Promise<User>}
 */
const updateBookById = async (bookId, updateBody) => {
  const book = await getBookById(bookId);
  if (!book) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Book not found');
  }
  if (updateBody.email && (await Book.isEmailTaken(updateBody.email, bookId))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Book already taken');
  }
  Object.assign(book, updateBody);
  await book.save();
  return book;
};

/**
 * Delete user by id
 * @param {ObjectId} bookId
 * @returns {Promise<User>}
 */
const deleteBookById = async (bookId) => {
  const book = await getBookById(bookId);
  if (!book) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Book not found');
  }
  await book.remove();
  return book;
};

module.exports = {
  createBook,
  queryBook,
  getBookById,
  getBookByName,
  updateBookById,
  deleteBookById,
};
