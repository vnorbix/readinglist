import BookList from "./components/BookList";
import Addbook from "./components/AddBook";
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache()
})

function App() {
  return (
    <ApolloProvider client={client}>
      <div id="main">
        <h1>Ninja's reading list</h1>
        <BookList />
        <Addbook />
      </div>
    </ApolloProvider>
  );
}

export default App;
