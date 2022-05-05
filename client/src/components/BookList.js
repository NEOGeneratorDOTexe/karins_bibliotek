import React, { Component } from 'react';
import { render } from 'react-dom';
import { graphql } from '@apollo/react-hoc'; 
import { getBooksQuery } from '../queries/queries';


/*%%%% %%%% %%%% %%%% BookList React-Component  %%%% %%%% %%%% %%%% */
class BookList extends Component {
  displayBooks() {
    var data = this.props.data;
    if (data.loading) {
      console.log("I am  currently loading books atm...")
      return (<div>Loading books</div>)
    } else { /* no es6 func. do not like.*/
      return data.books.map(function fireCallback(individBook_from_books_in_app_js_gql) {
        return (
          <li key={individBook_from_books_in_app_js_gql.id}>{individBook_from_books_in_app_js_gql.name}</li>
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
export default graphql(getBooksQuery)(BookList); // bind this query to this object (or more precise component)
