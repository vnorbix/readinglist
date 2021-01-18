import { useQuery } from "@apollo/client";
import { GET_BOOKS, BOOKS_SUBSCRIPTION } from "../queries/queries";
import BookDetails from "./BookDetails";
import React, { useState, useEffect } from 'react';

function BookList() {
  const [selected, setSelected] = useState(null);
  const { error, loading, data, subscribeToMore } = useQuery(GET_BOOKS);

  useEffect(() => {
    if (subscribeToMore) {
      subscribeToMore({
        document: BOOKS_SUBSCRIPTION,
        updateQuery: (prev, {subscriptionData}) => {
          if (!subscriptionData.data) {
            return prev;
          }
          
          const newBook = subscriptionData.data.bookAdded;
          return Object.assign({}, prev, {
            books: [...prev.books, newBook]
          });
        }
      });
    }
    
  }, [subscribeToMore]);

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
