import { useQuery } from "@apollo/client";
import { GET_BOOK } from "../queries/queries";

function BookDetails(props) {
  const { error, loading, data } = useQuery(GET_BOOK, {
    variables: { id: props.bookId },
    skip: !props.bookId
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const book = data && data.book;

  return (
    <div id="book-details">
        {
          book
          ?
          <div>
              <h2>{ book.name }</h2>
              <p>{ book.genre }</p>
              <p>{ book.author.name }</p>
              <p>All books by this author:</p>
              <ul className="other-books">
                {book.author.books.map(otherBook => (<li key={otherBook.id}>{otherBook.name}</li>))}
              </ul>
            </div>
          :
          <p>No book selected</p>
        }
    </div>
  );
}

export default BookDetails;
