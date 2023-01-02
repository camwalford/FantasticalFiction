import { db } from "../database.js";
import bcrypt from "bcryptjs"

export const register = (req, res) => {

    //CHECK IF USERNAME OR EMAIL ARE REGISTERED
    const q = "SELECT * FROM users WHERE email = ? OR username = ?";

    db.query(q, [req.body.email, req.body,username], (err, data)=>{
        if(err) return res.json(err);

        //RETURNS DATA ALREADY EXISTS STATUS + STATUS MESSAGE
        if(data.length) return res.status(409).json("User already exists");

        //HASHING THE PASSWORD USING BCRYPTJS LIBRARY
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);

        //INSERTING NEW USER INTO DB
        const q = "INSERT INTO users(`username`, `email`, `password`) VALUES (?)";
        const values = [
            req.body.username,
            req.body.email,
            hash
        ];
        db.query(q, [values], (err, data)=>{
            if(err) return res.json(err);
            return res.status(200).json("New user registered");
        });
    })

};

export const login = (req, res) => {
    
};

export const logout = (req, res) => {
    
};