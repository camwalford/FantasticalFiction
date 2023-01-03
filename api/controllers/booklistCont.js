import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";
import {db} from "../database.js";

/******************************************************************/
/****************** BOOKLIST RELATED FUNCTIONS ********************/
/******************************************************************/

//GETS SPECIFIC LIST BASED ON PARAMETER IN URL
export const getList = (req, res)=>{
    const q = 
    `SELECT * FROM usefulBooklist WHERE booklistID = ?`;

    const value = req.params.id;

    db.query(q, [value], (err, data)=>{
        if(err) return res.json(err);
        return res.status(200).json(data)
    })
}

//GETS ALL LISTS
export const getLists = (req, res)=>{
    const q = "SELECT * FROM usersBooklist";

    db.query(q, (err, data)=> {
        if(err) return res.send(err);
        return res.status(200).json(data);
    })
}

export const updateList =(req, res)=>{
    res.json("update from booklist controller")
}

export const addToList = (req, res)=>{
    res.json("from booklist controller");
}

export const deleteFromList =(req, res)=>{
    const token = req.cookies.access_token;
    if(!token) return res.status(401).json("User not authenticated");
    
    jwt.verify(token, "jwtkey", (err, userInfo)=>{
        if(err) return res.status(403).json("Invalid web token");

        const listId = req.params.id;
        const q = `DELETE FROM books_in_booklists WHERE bookID = ? AND booklistID = ?`
    })
    
    console.log(req.body);
    console.log(req.params.id);
    console.log(req.params.bookid);

    const q = `DELETE FROM books_in_booklists WHERE bookID = ? AND booklistID = ?`

    db.query(q, [req.params.bookid, req.params.id], (err, data) => {
        if(err) return res.send(err);
        return res.status(200).json("Book deleted");
    })
}



