const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const bookSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    author: {
      type: String,
      required: true,
      lowercase: true,
    },
    file: {
      type: Buffer,
      default: 'book',
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
bookSchema.plugin(toJSON);
bookSchema.plugin(paginate);

/**
 * Check if Author is taken
 * @param {string} Author - The user's Author
 * @param {ObjectId} [excludeUserId] - The id of the user to be excluded
 * @returns {Promise<boolean>}
 */
bookSchema.statics.isNameTaken = async function (name, excludeUserId) {
  const book = await this.findOne({ name, _id: { $ne: excludeUserId } });
  return !!book;
};

/**
 * Check if password matches the user's password
 * @param {string} password
 * @returns {Promise<boolean>}
 */

/**
 * @typedef User
 */
const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
