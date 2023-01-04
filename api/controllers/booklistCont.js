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
    const token = req.cookies.access_token;
    if(!token) return res.status(401).json("User not authenticated");
    jwt.verify(token, "jwtkey", (err, userInfo)=>{
        if(err) return res.status(403).json("Invalid web token");
        
        const booklistID = req.params.id;
        const bookID = req.params.bookid;
        const values = [booklistID, bookID];
        
        console.log("booklistid", booklistID);
        console.log("bookid", bookID);
        console.log("userid", userInfo.id);

        //ADDS BOOK WHERE BOOKID AND BOOKLISTID MATCH, AS WELL AS MAKING SURE THE LOGGED USER IS THE OWNER OF THE LIST
        const q1 = `SELECT * FROM booklists WHERE id = ? AND userID = ?`
        db.query(q1, [req.params.id, userInfo.id], (err, data) => {
            if(err) return res.json(err);
            if(data.length === 0 ) return res.status(404).json("User not associated with booklist.");
            console.log("made it in")
            const q2 = "INSERT INTO books_in_booklists (`booklistID`, `bookID`) VALUES (?)";
            db.query(q2, [values], (err, data) => {
                if(err) return res.status(403).json(err);
                return res.status(200).json("Book added to list");
            })
        })
        
    })
}

export const deleteFromList =(req, res)=>{

    //CHECKS IF USER HAS AN ACCESS TOKEN IN THEIR COOKIES
    const token = req.cookies.access_token;
    if(!token) return res.status(401).json("User not authenticated");
    jwt.verify(token, "jwtkey", (err, userInfo)=>{
        if(err) return res.status(403).json("Invalid web token");
        // console.log(req.params.id);
        // console.log(req.params.bookid);
        // console.log(userInfo.id);
        
        //DELETES BOOK WHERE BOOKID AND BOOKLISTID MATCH, AS WELL AS MAKING SURE THE LOGGED USER IS THE OWNER OF THE LIST
        const q = `DELETE FROM books_in_booklists WHERE bookID = ? AND booklistID = ? AND (SELECT userID FROM booklists WHERE id = ?) = ?`;
        db.query(q, [req.params.bookid, req.params.id, req.params.id, userInfo.id], (err, data) => {
            if(err) return res.status(403).json("You can't change another user's list");
            return res.status(200).json("Book deleted from list");
        })
    })
    
}



