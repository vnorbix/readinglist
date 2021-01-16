const Book = require('../model/book');
const Author = require('../model/author');
const { gql } = require('apollo-server-express');

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