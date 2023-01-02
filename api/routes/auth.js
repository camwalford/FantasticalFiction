import express from "express";
import { login, register, logout } from "../controllers/authCont.js";

const router = express.Router();

router.post("/register", register);

router.get('/register', ()=>{
    console.log("heyo");
})

router.post("/login", login);

router.post("/logout", logout);

export default router;
