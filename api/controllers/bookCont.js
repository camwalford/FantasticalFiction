import {db} from "../database.js";

//BOOK RELATED FUNCTIONS

export const getBooks = (req, res)=>{
    res.json("from book controller");
}

export const addBook = (req, res)=>{
    res.json("from book controller");
}

export const getBook = (req, res)=>{
    q = "SELECT * FROM books WHERE id = ?"



}

