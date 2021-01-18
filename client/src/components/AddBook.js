import { useMutation, useQuery } from "@apollo/client";
import { GET_AUTHORS, ADD_BOOK, GET_BOOKS } from "../queries/queries";
import React, { useState } from 'react';


function Addbook() {
  const [name, setName] = useState('');
  const [genre, setGenre] = useState('');
  const [authorId, setAuthorId] = useState('');
  const [nameFieldClassName, setNameFieldClassName] = useState('field');
  const [genreFieldClassName, setGenreFieldClassName] = useState('field');
  const [authorIdFieldClassName, setAuthorIdFieldClassName] = useState('field');
  const { error: authorsError, loading: authorsLoading, data: authorsData } = useQuery(GET_AUTHORS);
  const [addBook] = useMutation(ADD_BOOK, {
    //refetchQueries: [{query: GET_BOOKS}]
    // Something like would also work, then no extra fetch from server
    // update(cache, { data: { addTodo } }) {
    //   cache.modify({
    //     fields: {
    //       todos(existingTodos = []) {
    //         const newTodoRef = cache.writeFragment({
    //           data: addTodo,
    //           fragment: gql`
    //             fragment NewTodo on Todo {
    //               id
    //               type
    //             }
    //           `
    //         });
    //         return [...existingTodos, newTodoRef];
    //       }
    //     }
    //   });
    // }
  });

  function displayAuthors() {
    if (authorsLoading) {
      return <option disabled>Loading authors...</option>;
    }
  
    if (authorsError) {
      return <option disabled>Authors loading failed</option>;
    }

    return authorsData.authors.map(author => (
      <option key={ author.id } value={ author.id }>{ author.name }</option>
    ))
  }

  return (
    <form
      id="add-book"
      onSubmit={e => {
        e.preventDefault();

        setNameFieldClassName("field");
        setGenreFieldClassName("field");
        setAuthorIdFieldClassName("field");

        let fieldError = false;
        if (name.trim() === '') {
          fieldError = true;
          setNameFieldClassName("field error");
        }

        if (genre.trim() === '') {
          fieldError = true;
          setGenreFieldClassName("field error");
        }

        if (!authorId) {
          fieldError = true;
          setAuthorIdFieldClassName("field error");
        }

        if (fieldError) {
          return;
        }

        addBook({ variables: { name, genre, authorId }});
        setName('');
        setGenre('');
        setAuthorId('');
      }}>
      <div className={nameFieldClassName}>
        <label>Book name:</label>
        <input value={name} type="text" onChange={(e) => setName(e.target.value)} />
      </div>

      <div className={genreFieldClassName}>
        <label>Genre:</label>
        <input value={genre} type="text" onChange={(e) => setGenre(e.target.value)} />
      </div>

      <div className={authorIdFieldClassName}>
        <label>Author:</label>
        <select value={authorId} onChange={(e) => setAuthorId(e.target.value)}>
            <option>Select author</option>
            { displayAuthors() }
        </select>
      </div>

      <button>+</button>
    </form>
  );
}

export default Addbook;
