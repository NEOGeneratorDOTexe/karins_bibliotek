const graphql = require("graphql"); // GraphQL is a query language for APIs and a runtime for fulfilling those queries with your ... https://www.oreilly.com/library/view/data-lake-for/9781787281349/5140e9d5-53d9-421b-a73b-ff988bd5c4d9.xhtml
const _ = require("lodash");
const Book = require("../models/book.js");
const Author = require("../models/author.js")
const mongoose = require("mongoose");
// describe object type we want in our graph.
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList
} = graphql; // destruct GraphQLObjectType from lib grab different objects from lib
// initialize our first GraphQLObject  // notice that both id of these object has a GraphQLID type which can be both a int and a string.
const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args) {
                return _.filter(books, { authorId: parent.id }) // {authorId = 2  => can remain in the array} // will return and filter everything with passed arg id
            }
        }

    })
});
// Identified our second GraphQLObjectType
// booktype has fields which is a function, different options
const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        author: {
            type: AuthorType, // this is the reason fields hash to have a function as value and not a single json object. you have to wrap fields in function
            resolve(parent, args) {
                console.log('This is parent object attribute `name`: ' + parent.name + "working with resolve. \n this is parent: " + parent);
                // return _.find(authors, {id: parent.authorId});
            }
        }
    })
});
// when someone query a book i want you to use this BookType. // argument i want you to use in this query is id
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType', // RootQueryn är basically hela uppbyggnaden av GraphQL, det är här språket börjar och all teknik man behöver förstå, hur dessa querys arbetar och byter ut info + dirigerar delegater/andra funcs.
    fields: {
        book: {
            type: BookType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                console.log("I am microservice and a middleware section sending users resources of GraphQLObject: " + BookType.toString() + " && ID: " + args.id);
                // return _.find(books, {id: args.id});
            }
        },
        author: {
            "type": AuthorType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                console.log("I am microservice and a middleware section sending users resources of GraphQLObject: " + AuthorType.toString() + " && ID: " + args.id);
                // return _.find(authors, {id: args.id});
            }
        },
        books: {
            type: new GraphQLList(BookType),
            // will not need args key and it values, cuz we want to return a booklist. we don't want to search for a particular book
            resolve(parent, args) {
                // return books;
            }
        },
        authors: {
            type: new GraphQLList(AuthorType),
            resolve(parent, args) {
                // return authors;
            }
        }
    }
});

const Mutation = new GraphQLObjectType({
    "name": "Mutation",
    "fields": {
        /* args.name: "Benjamin_Appelberg", args.age: 250 */
        /* => mutation{addAuthor(name, age){name age}} */
        "addAuthor": {
            "type": AuthorType,
            "args": {
                "name": { type: GraphQLString },
                "age": { type: GraphQLInt }
            },
            // resolve func takes user args and store it in db
            resolve(parent, args) {
                console.log(`resolve function called with parent: ${parent} args: ${args.name + args.age}`);
                try {


                    // imported Author model exported from author.js see const assign in the start of schema.js.
                    let author = new Author({
                        "name": args.name,
                        "age": args.age
                    });
                    author.save(); // saves author obj to mongodb
                } catch (e) {
                    console.log(e + "status code: 400");
                }
            } // end of resolve func 
        }, // end of addAuthor object
        "addBook": {
            "type": BookType,
            "args": {
                "name": { "type": GraphQLString },
                "genre": { "type": GraphQLString },
                "authorId": { "type": GraphQLID }
            },
            resolve(parent, args) {
                try {
                    let book = new Book({
                        "name": args.name,
                        "genre": args.genre,
                        "authorId": args.authorId
                    });
                    book.save();
                    console.log("Sucessfully saved dataobject:" + book);
                }
                catch (e) {
                    console.log(e + "status code: 400");
                }
            }
        }

    }
}); // end of Mutation GraphQLObjectType

// This is the query that is interacting with front end user => get exports to app.js
module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation // mutation object that helps us önsvärt mutera data.
});

