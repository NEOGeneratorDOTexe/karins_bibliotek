const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookSchema = new Schema({
    name: String,
    genre: String,
    authorId: String
});

module.exports = mongoose.model("Book", bookSchema) // defining a model // model is equal to coll in db. these models will follow the created bookSchema above. // then we export this model module