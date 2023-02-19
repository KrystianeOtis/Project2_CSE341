const Joi = require('joi');

function validateBook(book)
{
    const JoiSchema = Joi.object({
        title: Joi.string().min(3).max(255).required(),
        author: Joi.string().min(3).max(255).required(),
        genre: Joi.string().min(3).max(255).required(),
        isbn: Joi.string().length(13).required()
    }).options({ abortEarly: false});

    const errors = JoiSchema.validate(book).error;
    return errors;
}
module.exports={validateBook}

// const book = {
//     "title": "The Lord of the Rings",
//     "author": "J.R.R. Tolkien",
//     "genre": "Fantasy",
//     "isbn": "9780261102359"
// };

// const { error } = validateBook(book);
// if (error) {
//     console.log(error.message);
// } else {
//     console.log("Book is valid.");
// }