import { db } from "../database.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";



export const register = (req, res) => {

    //CHECK IF USERNAME OR EMAIL ARE REGISTERED
    const q = "SELECT * FROM users WHERE email = ? OR username = ?";

    db.query(q, [req.body.email, req.body.username], (err, data)=>{
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
   
    //CHECK IF USER EXISTS IN DB
    const q = "SELECT * FROM users WHERE username = ?";
    db.query(q, [req.body.username], (err,data)=> {
        if(err) return res.json(err);
        if(data.length === 0 ) return res.status(404).json("User not found!");

        const correctPassword = bcrypt.compareSync(req.body.password, data[0].password);
        if(!correctPassword) return res.status(400).json("Incorrect login information");

        //CREATE A JSON WEB TOKEN USING USERS ID TO VERIFY USER IDENTITY
        const token = jwt.sign({id:data[0].id}, "jwtkey");

        //SEPARATES USER PASSWORD FROM OTHER INFO
        const {password, ...other} = data[0]

        //SETS COOKIE NAME AND VALUE
        //ONLY ACCEPTS API REQUESTS (NO SCRIPTS CAN ACCESS THE COOKIES)
        res.cookie("access_token", token, {
            httpOnly:true
        }).status(200).json(other);
    })  
};

export const logout = (req, res) => {
    res.clearCookie("access_token",{
      sameSite:"none",
      secure:true
    }).status(200).json("User has been logged out.")
  };