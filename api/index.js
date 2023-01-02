import express from "express";
import booklistRoutes from "./routes/booklist.js";
import bookRoutes from "./routes/book.js";
import userRoutes from "./routes/user.js";
import authRoutes from "./routes/auth.js";
import cookieParser from "cookie-parser"

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/api/booklist", booklistRoutes);
app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/book", bookRoutes);



const port = 8000;
app.listen(port, ()=> {
    console.log("Listening on port", port);
})