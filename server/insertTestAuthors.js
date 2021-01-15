const conn = new Mongo();
const db = conn.getDB("readinglist");

const books = [
    {
        name: "Franz Kafka",
        age: 40,
        books: []
    },
    {
        name: "J. R. R. Tolkien",
        age: 63,
        books: []
    }
];

db.authors.insertMany(books);