import React, { Component } from 'react';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider, // surrounding whole app inject 
  useQuery,
  gql,
  graph
} from "@apollo/client";
// apollo-provider is needed to wrap our application and inject what ever data we receive from the server and then inject into to anything that is inside the apollo.
// we do this by surrounding our react-template with the AP-tag return{<ApolloProvider> <h1>Hej Universal Geniet! </ h1> </ ApolloProvider> } 
// comps
import BookList from './components/BookList.js';
import AddBook from './components/AddBook.js'
// apollo client setup
const apolloClientDataProxyUri = new ApolloClient({
  uri: "http://localhost:4000/graphql", // making requests from this endpoint , injecting recevied data from graphql
  // "to solve": "invariant.ts:12 Uncaught Invariant Violation: To initialize Apollo Client, you must specify a 'cache' property in the options object.". add key => "cache" and add value => new InMemoryCache() 
  cache: new InMemoryCache()
});
class App extends Component { 
  render() {

    return (
      <ApolloProvider client={apolloClientDataProxyUri}>
        <div id="main">
          <h1>PayEx PxDL Testing Env</h1> 
          <BookList />
          <AddBook />
        </div>
      </ ApolloProvider>
    );

  }
}

export default App;