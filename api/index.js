import express from "express";
import booklistRoutes from "./routes/booklist.js";
import bookRoutes from "./routes/book.js";
import userRoutes from "./routes/user.js";
import authRoutes from "./routes/auth.js";
import cookieParser from "cookie-parser"
import mysql from "mysql2/promise";

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/api/booklist", booklistRoutes);
app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/book", bookRoutes);


async function dbinit() {
    const connection = await mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        multipleStatements: true
    });
    const createDBAndTables = 
        `CREATE DATABASE IF NOT EXISTS booksite;
        use booksite; 
        CREATE TABLE IF NOT EXISTS user (
            user_id int NOT NULL AUTO_INCREMENT,
            username VARCHAR(255),
            first_name VARCHAR(255),
            last_name VARCHAR(255),
            email VARCHAR(255),
            password VARCHAR(255),
            PRIMARY KEY(user_id));
        CREATE TABLE IF NOT EXISTS book (
            book_id INT NOT NULL AUTO_INCREMENT,
            title VARCHAR(255) NOT NULL,
            author VARCHAR(255) NOT NULL,
            description VARCHAR(255),
            cover VARCHAR(255),
            ISBN VARCHAR(255),
            PRIMARY KEY(book_id));
        CREATE TABLE IF NOT EXISTS booklist (
            booklist_id INT NOT NULL AUTO_INCREMENT,
            book_id INT NOT NULL,
            user_id INT NOT NULL,
            status VARCHAR(255),
            rating INT,
            PRIMARY KEY(booklist_id, book_id, user_id),
            FOREIGN KEY(book_id) REFERENCES books(book_id),
            FOREIGN KEY(user_id) REFERENCES user(user_id));`
    await connection.query(createDBAndTables);
    let [rows1, fields1] = await connection.query("SELECT * FROM user");
    // no records? Let's add a couple - for testing purposes
    if (rows1.length == 0) {
        let userRecords = "INSERT INTO user (username, first_name, last_name, email, password) values ?";
        let recordValues = [
            ["VeryGoodUserName", "Cam", "Walford", "cwalford2012@gmail.com", "password123"],
            ["VeryBadUserName", "Bam", "Balford", "bbalford@gmail.com", "password321"]
        ];
        await connection.query(userRecords, [recordValues]);
    }

    let [rows2, fields2] = await connection.query("SELECT * FROM books");
    if (rows2.length == 0) {
        let bookRecords = "INSERT INTO books (title, author, description, cover, ISBN) values ?";
        let bookRecordValues = [
            ["The Great Gatsby", "F. Scott Fitzgerald", "The Great Gatsby is a 1925 novel written by American author F. Scott Fitzgerald that follows a cast of characters living in the fictional town of West Egg on prosperous Long Island in the summer of 1922. The story primarily concerns the young and mysterious millionaire Jay Gatsby and his quixotic passion and obsession with the beautiful former debutante Daisy Buchanan.", "https://upload.wikimedia.org/wikipedia/en/7/7f/The_Great_Gatsby_1925jacket.jpg", "9780743273565"],
            ["Moby Dick", "Herman Melville", "Moby Dick is a 1851 novel by American author Herman Melville. The novel tells the story of Ishmael, a sailor on a whaling voyage as he joins the crew of the Pequod, captained by Ahab, who is obsessed with hunting and killing a giant white sperm whale. The novel explores themes of good and evil, obsession, and the monstrosity of nature.", "https://upload.wikimedia.org/wikipedia/commons/thumb/6/64/Moby-Dick_first_edition_title_page.jpg/220px-Moby-Dick_first_edition_title_page.jpg", "9780141391764"],
            ["The Catcher in the Rye", "J. D. Salinger", "The Catcher in the Rye is a 1951 novel by J. D. Salinger. A controversial novel originally published for adults, it has since become popular with adolescent readers for its themes of teenage angst and alienation. It has been translated into almost all of the world's major languages. Around 1 million copies are sold each year with total sales of more than 65 million books.", "https://upload.wikimedia.org/wikipedia/en/8/8b/Catcher_in_the_Rye_first_edition_cover.jpg", "9780316769174"],
            ["Pride and Prejudice", "Jane Austen", "Pride and Prejudice is a 1813 novel by English author Jane Austen. The novel follows the life of Elizabeth Bennet, one of five sisters, as she navigates the challenges of finding a husband in Georgian era England. The story is known for its commentary on social class, education, and marriage in the late 18th and early 19th centuries.", "https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/Pride_and_Prejudice_title_page.jpg/220px-Pride_and_Prejudice_title_page.jpg", "9780199535770"],
            ["To Kill a Mockingbird", "Harper Lee", "To Kill a Mockingbird is a 1960 novel by American author Harper Lee. Set in the 1930s in the fictional Maycomb County, Alabama, the novel follows the story of Scout Finch, a young girl, as she grows up and learns about racial injustice and the loss of innocence. The novel is widely regarded as a masterpiece of modern American literature.", "https://upload.wikimedia.org/wikipedia/en/thumb/6/68/To_Kill_a_Mockingbird.JPG/220px-To_Kill_a_Mockingbird.JPG", "9780446310789"],
            ["Wuthering Heights", "Emily Bronte", "Wuthering Heights is a 1847 novel by English author Emily Bronte. The novel tells the story of the intense and tempestuous relationship between Catherine Earnshaw and Heathcliff, two people from different social classes, and their experiences of love, loss, and revenge. The novel is widely regarded as one of the greatest works of English literature.", "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Wuthering_Heights_1847_title_page.jpg/220px-Wuthering_Heights_1847_title_page.jpg", "9780141439556"],
            ["The Adventures of Huckleberry Finn", "Mark Twain", "The Adventures of Huckleberry Finn is a 1884 novel by American author Mark Twain. The novel tells the story of Huck Finn, a young boy, as he travels down the Mississippi River with an escaped slave, Jim, and encounters various characters and adventures along the way. The novel is widely regarded as a masterpiece of American literature and a classic of children's literature.", "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Huckleberry_Finn_first_edition_title_page.jpg/220px-Huckleberry_Finn_first_edition_title_page.jpg", "9780486280615"]
        ];
        await connection.query(bookRecords, [bookRecordValues]);
    }

    let [rows3, fields3] = await connection.query("SELECT * FROM booklist");
    if (rows3.length == 0) {
        let bookListRecords = "INSERT INTO book_list (book_id, user_id, status, rating) values ?";
        let bookListRecordValues =[
            [1, 1, "plan to read", 0],
            [2, 1, "currently reading", 0],
            [3, 1, "read", 9],
            [4, 1, "dropped", 7],
            [5, 1, "plan to read", 0],
            [6, 2, "read", 10],
            [7, 2, "currently reading", 3],
            [8, 2, "read", 8]
        ];
        await connection.query(bookListRecords, [bookListRecordValues]);
    }
    connection.end();
}

const port = 8000;
app.listen(port, ()=> {
    dbinit();
    console.log("Listening on port", port);
})