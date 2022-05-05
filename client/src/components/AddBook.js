import React, { Component } from 'react';
import { render } from 'react-dom'; /* react-dom render method is currently considered as a legecy. for more see => https://reactjs.org/docs/react-dom.html*/
import { graphql } from '@apollo/react-hoc';
import {flowRight as compose} from 'lodash'; /* deprecated compose from react apollo 3.3 https://stackoverflow.com/questions/57445294/compose-not-exported-from-react-apollo */
import { getAuthorsQuery, getBooksQuery, addBookMutation } from '../queries/queries';


class AddBook extends Component {

  constructor(props) {
    super(props); /*this is kinda a convention in class-based Components in the React framework */
    this.state = {
      name: "",
      genre: "",
      author: "", 
    }; // initial form object where value is empty.
  }
  /* Function 1 - displayAuthors as optionlist */
  displayAuthors() {
    var data = this.props.getAuthorsQuery;
    console.log(this.props.getAuthorsQuery);
    /*if we have not recieved data => then doStuff0() down below.*/
    if (data.loading) {
      return (<option>Loading authors</option>)
    } else { /*if we have data then we return doStuff1().*//*no es6 func. do not like && A callback function is a function passed into another function as an argument, which is then invoked inside the outer function to complete some kind of routine or action.*/
      return data.authors.map(function fireCallback(individAuthor_from_authors_in_app_js_gql) {
        return (<option key={individAuthor_from_authors_in_app_js_gql.id} value={individAuthor_from_authors_in_app_js_gql.id}> {individAuthor_from_authors_in_app_js_gql.name} </option>)// <li key={individAuthor_from_authors_in_app_js_gql.id}>{individAuthor_from_authors_in_app_js_gql.name}</li>);
      });
    }
  }

  /* Function 2 - submitForm() can be any name is a func lol ^^) */
  submitForm(eventObject) {
    // prevent the default action for occuring => @2022-05-04T12:39 if we submit something and press button it just refresh page and nothing happends on the front- nor backend
    eventObject.preventDefault();
    // console.log(this.state); // remember code said => bind this 
    /* #@PxDL  */
    /*here is where books get added to db */
    try {
      this.props.addBookMutation({
        variables: {
          name: this.state.name,
          genre: this.state.genre,
          authorId: this.state.authorId
        }, 
        refetchQueries: [{ query: getBooksQuery  }] /* rerender this compononent by refetching data => it knows that it has more data to fetch by the newly added datas*/
      });
      console.log("Sucessfully stored data: " + this.state.name + " in PxDL");
    }
    catch (e) {
      console.log(e.stack())
    }
  }
  render() {
    /*when form is submitted we want to attatch an evntlisnr that fire some
    form of function that answer the submission by user => 
    */
   /* observed => onChange={} have to have es6 funcs not working with trad funcs */
    return (
      /* when button is pressed call the func*/
      <form id="add-bok" onSubmit={ this.submitForm.bind(this/*<-this refers to the component itself */)}>

        <div className="field">
          <label>Book name:</label>
          <input type="text" onChange={(eventObject) => this.setState({name: eventObject.target.value})} /> 
        </div>


        <div className="field">
          <label>Genre:</label>
          <input type="text" onChange={(eventObject) => this.setState({genre: eventObject.target.value})} />
        </div>


        <div className="field">
          <label>Author:</label>
          <select onChange={(eventObject) => { this.setState({authorId: eventObject.target.value})}}> 
            <option>Select author</option>
            {this.displayAuthors()}
          </select>
        </div>


        <button>Add</button>


      </form>
    ); // return end
  } // render end
} // AddBok Comp end
//          <input type="text" onChange={} /> /* onchange listener  */

// downbelow we export a composed React object with graphql queries to App.js
export default compose(
  graphql(getAuthorsQuery, { name: "getAuthorsQuery" } ),
  graphql(getBooksQuery, { name: "getBooksQuery" } ),
  graphql(addBookMutation, { name: "addBookMutation"})
)(AddBook); // short: these queries inside compose are bound to the this class comp obj ,long: attatching any queries we have in compose func on the component object 