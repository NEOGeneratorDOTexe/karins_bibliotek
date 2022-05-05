import React, { Component } from 'react';
import { render } from 'react-dom'; /* react-dom render method is currently considered as a legecy. for more see => https://reactjs.org/docs/react-dom.html*/
import { graphql } from '@apollo/react-hoc';
import { getBookQuery } from '../queries/queries.js'/*%%%% %%%% %%%% %%%% BookDetails React-Component  %%%% %%%% %%%% %%%% */
class BookDetails extends Component {
    displayBookDetails() {
        const { book } = this.props.data; /* or this.props.data.book */
        if (book) {
            return (
                <div>
                    <h2> Title: {book.name}</h2>
                    <p> Genre: {book.genre} </p>
                    <p> Id: {book.id} </p>
                </div>
            )
        } else {
            return (
                <div>No book selected...</div>
            )
        }
    }
    render() {
        return (
            <div id="book-details">
                <p>{this.displayBookDetails()}</p>
            </div>

        ); // return end
    } // render end
} // BookDetails Comp end


/*%%%% %%%% %%%% %%%% EXPORT - BookDetails React-Component  %%%% %%%% %%%% %%%% */
export default graphql(getBookQuery, {
    options: (props) => {
        return {
            variables: {
                id: props.bookId
            }
        }
    }
})(BookDetails); /* graphql(queryy)bind() */


/*BIN  
    // for displayBooksDetails when isFix().
    <ul className="other-books">
        { book.author.books.map(item => {
            return <li key={ item.id}>{ item.name }</li>
        })}
    </ul>
*/