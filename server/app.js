const express = require('express'); // npm install express
const { graphqlHTTP } = require('express-graphql'); // npm install express-graphql
const schema = require('./schema/schema');
const mongoose = require('mongoose');

const app = express();

mongoose.connect('mongodb+srv://db2-stu-33:Nsm63zEd4QYU8r3H@pureballast-uryl6.azure.mongodb.net')
mongoose.connection.once('open', () => {
  console.log('connected to database');
}) 

const PORT = 300;
// MIDDLEWARE
app.use('/graphql', graphqlHTTP({
    schema: schema,
    graphiql: true // we want to use this grapiql tool when we go to this endpoint (middleware)
}));

// this code is the first code that is visable in terminal by the node AppName.js (command)
app.listen(PORT, () => {
    console.log('now listening for request on port ' + PORT)
});














/* Benjamin Appelbergs Codes */

// https://expressjs.com/en/guide/routing.html //
// GET method (api-route/endpoint)
app.get('/', (req, res) => {
    res.send('This route path will match requests to the root route, /.')
    console.log('A user has requested the root endpoint/route')
  });


























// POST method route
app.post('/', (req, res) => {
    res.send('POST request to the homepage')
  });

// There is a special routing method, app.all(), used to load middleware functions at a path for all HTTP request methods. 
/* For example, the following handler is executed for requests to the route “/secret” whether using GET, POST, PUT, DELETE, or any other HTTP request method supported in the http module. */
app.all('/secret', (req, res, next) => {
    console.log('Accessing the secret section ...')
    next() // pass control to the next handler
  });

// https://expressjs.com/en/guide/routing.html //
  
app.get('/example/b', (req, res, next) => {
    console.log('the response will be sent by the next function ...')
    next();
  }, (req, res) => {
    res.send('Hello from B!')
  })
/* Benjamin Appelbergs Codes */