import {db} from "../database.js";

/******************************************************************/
/******************** BOOK RELATED FUNCTIONS **********************/
/******************************************************************/

export const getBooks = (req, res)=>{
    const q = 'SELECT * FROM books'
    db.query(q, (err, data) => {
        if(err) return res.send(err);
        return res.status(200).json(data);
    })
}

export const getBook = (req, res)=>{
    q = "SELECT * FROM books WHERE id = ?"

}

export const addBook = (req, res)=>{
    res.json("from book controller");
}

export const deleteBook = (req, res)=>{
    res.json("from book controller");
}

export const updateBook = (req, res) => {
    res.json("from book controller");
}

