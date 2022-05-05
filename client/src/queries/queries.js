import {gql, graphql} from '@apollo/react-hoc';
/*see else codeblock in function displayAuthors() in AddBook.js*/
const getAuthorsQuery  = gql`
    query {
        authors {
            name
            id 
        }
    }
`;

const getBooksQuery = gql`
    query {
        books{
            name
            id 
        }
    }
`;
/* Hur användaren kan skicka med req o får unika data tillbaka #@PxDL
    syntaxis: mutation/query($key0: Datatype0!, $key1: DataType1!, $key2: DataType2!) {

    }
    uppropstecken säger att det måste vara av den datatypen och inte null.
    ! === GraphQLNotNull obj.
    gql pass args into mutation(args) then call the method addBoo with the passed args
    mutation takes in args of these types x, y, z. then inside this mutation we can access the args that was passed on, we are accepting variables in mutation
*/
const addBookMutation = gql`
    mutation($name: String!, $genre: String!, $authorId: ID!) {
        addBook(name: $name, genre: $genre, authorId: $authorId ) {
            name
            id
        }
    }
`;

const getBookQuery = gql`
query($id: String!){
    book(id: $id ) {
        id
        name
        genre
        author{
            id
            name
            age
            books{
                id
                name
            }
        }
    }
}
`;

export {getAuthorsQuery, getBooksQuery, addBookMutation, getBookQuery};