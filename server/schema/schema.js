const Book = require('../model/book');
const Author = require('../model/author');
const { gql, PubSub } = require('apollo-server-express');

const pubsub = new PubSub();
const BOOK_ADDED = 'BOOK_ADDED';

const typeDefs = gql`
  type Query {
    books: [Book]
    authors: [Author]
    book(id: String): Book
    author(id: String): Author
  }

  type Mutation {
    addBook(name: String, genre: String, authorId: String): Book
    addAuthor(name: String, age: Int): Author
  }

  type Subscription {
    bookAdded: Book
  }

  type Book {
    id: String
    name: String
    genre: String
    author: Author
  }

  type Author {
    id: String
    name: String
    age: Int
    books: [Book]
  }

  
`;

const resolvers = {
  Query: {
    books: () => Book.find({}),
    authors: () => Author.find({}),
    author(parent, args, context, info) {
      return Author.findById(args.id);
    },
    book(parent, args, context, info) {
      return Book.findById(args.id);
    }
  },
  Mutation: {
    addBook(parent, args, context, info) {
      let book = new Book({
          name: args.name,
          genre: args.genre,
          authorId: args.authorId
      });
      pubsub.publish(BOOK_ADDED, { bookAdded: args });
      return book.save();
    },
    addAuthor(parent, args, context, info) {
      let author = new Author({
          name: args.name,
          age: args.age
      });
      return author.save();
    },
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator([BOOK_ADDED])
    }
  },
  Book: {
    author(parent, args, context, info) {
      return Author.findById(parent.authorId);
    }
  },
  Author: {
    books(parent, args, context, info) {
      return Book.find({ authorId: parent.id });
    }
  }
};

module.exports = {
  typeDefs,
  resolvers
}