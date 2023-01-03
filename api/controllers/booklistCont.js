import {db} from "../database.js";

/******************************************************************/
/****************** BOOKLIST RELATED FUNCTIONS ********************/
/******************************************************************/

export const getList = (req, res)=>{
    const q = 
    `SELECT * FROM usefulBooklist WHERE username = ?`;

    const value = req.params.id;

    db.query(q, [value], (err, data)=>{
        if(err) return res.json(err);
        return res.status(200).json(data)
    })
}

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
    res.json("update from booklist controller")
}



