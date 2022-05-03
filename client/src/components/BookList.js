/* Copyright portofOS@protonmail.com 2022-2400*/import React, { Component } from 'react';
import { render } from 'react-dom';
import { gql } from '@apollo/client';
import { graphql } from '@apollo/react-hoc';  // or import { graphql } from '@apollo/client/react/hoc';
const GET_BOOKS = gql`
    query GetBooks {
        books{
            name
            id 
        }
    }
`;
class BookList extends Component {
  displayBooks() {
    var data = this.props.data;
    if (data.loading) {
      return (<div>Loading data... // I am a return divtag from class Booklist (ext: comp) :)</div>)
    } else { // no es6 func. do not like
      return data.books.map(function eachFiredFuncCallBackThisNextOnItem(bookInBookList) {
        return (
          <li key={bookInBookList.id}>{bookInBookList.name}</li>
        );
      })
    }
  }
  render() {
    console.log("render() called");
    return (
    <div>
      <ul id="book-list">
        {this.displayBooks()}
      </ul>
    </div>
    );
  } // render end
} // BookList Comp end
/* BY EXPORTING THIS GRAPHQL we have acess to everything that comes back from this query */
// the data is stored in the react props comp
export default graphql(GET_BOOKS)(BookList); // bind this query to this object (or more precise component)
