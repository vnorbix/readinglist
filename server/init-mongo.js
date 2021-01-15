db.createUser(
    {
        user: "test",
        pwd: "qwe123",
        roles: [{
            role: "readWrite",
            db: "readinglist"
        }]
    }
)

const authors = [
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

db.authors.insertMany(authors);