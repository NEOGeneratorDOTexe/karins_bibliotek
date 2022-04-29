const graphql = require('graphql');
// describe object type we want in our graph.
// var port === 300;
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt
} = graphql; // destruct GraphQLObjectType from lib grab different objects from lib

const _ = require('lodash');

// THIS IS SEMISTRUCTURED DATA SAVED
var books = [
    {name: 'Name of the Wind', genre: 'Fantasy', id: '1', authorId: '1'}, 
    {name: 'Harry Potter and the Sorcery Stone', genre: 'Fantasy', id: '2', authorId: '2'},
    {name: 'Frankenstein', genre: 'Sci-Fi', id: '3', authorId: '3'}
];

var authors = [
    {name: 'Patrick Rothfuss', age: 44, id: '1'},
    {name: 'J.K Rowling && benjamin.williams-appelberg@payex.com', age: 81, id: '2'},
    {name: 'Mary Shelley', age: 225, id: '3'}
];
// Identified our first GraphQLObjectType
// booktype has fields which is a function, different options
const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        genre: {type: GraphQLString},
        author: {
            type:AuthorType,
            resolve(parent, args) {
                var stringObjectRequest = `{
                    author(id: ${args.id}) {name, id}
                  }`;// sql injection == bad. leave server forever. == banned. add entity skill.;
                console.log('This is parent: ' + parent.toString() + parent + "och detta har anropats" + stringObjectRequest);
                return _.find(authors, {id: parent.authorId})
            }
        }
    })
});
// initialize our second GraphQLObject  // notice that both id of these object has a GraphQLID type which can be both a int and a string.
const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        age: {type: GraphQLInt}
    })
});
// when someone query a book i want you to use this BookType. // argument i want you to use in this query is id
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType', // RootQueryn är basically hela uppbyggnaden av GraphQL, det är här språket börjar och all teknik man behöver förstå, hur dessa querys arbetar och byter ut info + dirigerar delegater/andra funcs.
    fields: {
        book: {
            type: BookType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args) {
                console.log('Program was called from GraphiQL-UI @http://localhost:port/graphql')
                console.log("I am microservice and a middleware section sending users resources of GraphQLObject: " + BookType.toString() + " && ID: " + args.id);
                return _.find(books, {id: args.id});
            }
        },
        author: {
            type: AuthorType,
            args: { id: { type: GraphQLID }},
            resolve(parent, args) {
                console.log('Program was called from GraphiQL-UI @http://localhost:port/graphql')
                console.log("I am microservice and a middleware section sending users resources of GraphQLObject: " + AuthorType.toString() + " && ID: " + args.id);
                return _.find(authors, {id: args.id});
            }
        }
         
    }
});

// This is the query that is interacting with front end user => get exports to app.js
module.exports = new GraphQLSchema({
    query: RootQuery
});

