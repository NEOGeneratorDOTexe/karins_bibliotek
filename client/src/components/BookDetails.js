import React, { Component } from 'react';
import { render } from 'react-dom'; /* react-dom render method is currently considered as a legecy. for more see => https://reactjs.org/docs/react-dom.html*/
import { graphql } from '@apollo/react-hoc';
import { getBookQuery } from '../queries/queries.js'
/*%%%% %%%% %%%% %%%% BookList React-Component  %%%% %%%% %%%% %%%% */
class BookDetails extends Component {

    render() {
        return (
            <div id="book-details">
                <p>Output book details here pls!</p>
            </div>

        );
    } // render end
} // BookDetails Comp end
export default graphql(getBookQuery)(BookDetails);
// checkout part #34 