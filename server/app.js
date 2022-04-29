const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema/schema');

const app = express();

// MIDDLEWARE
app.use('/graphql', graphqlHTTP({
    schema: schema,
    graphiql: true // we want to use thise grapiql tool when we go to this endpoint (middleware)
}));

app.listen(300, () => {
    console.log('now listening for request on port 300')
});



/* Benjamin Appelbergs Codes */

// https://expressjs.com/en/guide/routing.html //
// GET method (api-route/endpoint)
app.get('/', (req, res) => {
    res.send('This route path will match requests to the root route, /.')
    console.log('app.get(`/`, (req,res) was called)')
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