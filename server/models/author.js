const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const authorSchema = new Schema({
    name: String,
    age: Number
});

module.exports = mongoose.model("Author", authorSchema) // defining a model // model is equal to coll in db. these models will follow the created bookSchema above. // then we export this model module