import BookList from "./components/BookList";
import Addbook from "./components/AddBook";
import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from '@apollo/client/utilities';
import { ApolloClient, InMemoryCache, ApolloProvider, split, HttpLink } from '@apollo/client'

const wsLink = new WebSocketLink({
  uri: `ws://localhost:4000/graphql`,
  options: {
    reconnect: true
  }
});

const httpLink = new HttpLink({
  uri: 'http://localhost:4000/graphql'
});

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink,
);

const client = new ApolloClient({
  link: splitLink,
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
