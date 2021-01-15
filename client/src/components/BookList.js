import { useQuery } from "@apollo/client";
import { GET_BOOKS } from "../queries/queries";
import BookDetails from "./BookDetails";
import React, { useState } from 'react';

function BookList() {
  const [selected, setSelected] = useState(null);
  const { error, loading, data } = useQuery(GET_BOOKS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;


  return (
    <div>
      <ul id="book-list">
        {data.books.map(book => (<li onClick={e => setSelected(book.id)} key={book.id}>{book.name}</li>))}
      </ul>
      <BookDetails bookId={ selected } />
    </div>
  );
}

export default BookList;
