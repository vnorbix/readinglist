import { gql } from "@apollo/client";

const GET_AUTHORS = gql`
    {
        authors {
            name
            id
        }
    }
`;

const GET_BOOKS = gql`
    {
        books {
            name
            id
        }
    }
`;

const GET_BOOK = gql`
  query GetBook($id: String){
    book(id: $id) {
      id
      name
      genre
      author {
        id
        name
        age
        books {
          name
          id
        }
      }
    }
  }
`;

const ADD_BOOK = gql`
  mutation AddBook($name: String!, $genre: String!, $authorId: String!) {
    addBook(name: $name, genre: $genre, authorId: $authorId){
      name
      id
    }
  }
`;

const BOOKS_SUBSCRIPTION = gql`
  subscription OnBookAdded {
    bookAdded {
      id
      name
    }
  }
`;

export { GET_AUTHORS, GET_BOOKS, GET_BOOK, ADD_BOOK, BOOKS_SUBSCRIPTION }