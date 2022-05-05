import React, { Component } from 'react';
import { render } from 'react-dom';
import { graphql } from '@apollo/react-hoc';
import { getBooksQuery } from '../queries/queries.js';

// other components apart from THIS component
import BookDetails from './BookDetails.js';


/*%%%% %%%% %%%% %%%% BookList React-Component  %%%% %%%% %%%% %%%% */
class BookList extends Component {
  constructor(props) {
    super(props);
    // state = object with attributes
    this.state = {
      selected: null // when user click on a individual item
    }
  }
  displayBooks() {
    var data = this.props.data;
    if (data.loading) {
      console.log("I am  currently loading books atm...")
      return (<div>Loading books</div>)
    } else { /* no es6 func. do not like.*/
      return data.books.map(book => {
        return (
          <li key={ book.id } onClick={ (e) => { this.setState({ selected: book.id })}}>{ book.name }</li>
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
        <BookDetails bookId= {this.state.selected}/>
      </div>
    );
  } // render end
} // BookList Comp end
/* BY EXPORTING THIS GRAPHQL we have acess to everything that comes back from this query */
// the data is stored in the react props comp
export default graphql(getBooksQuery)(BookList); // bind this query to this object (or more precise component)
