import express from "express";
import { addToList, deleteFromList, getLists, getList, updateList } from "../controllers/booklistCont.js";


const router = express.Router();

router.get("/", getLists);
router.get("/:id", getList);
router.post("/:id/:bookid", addToList);
router.delete("/:id/:bookid", deleteFromList);
router.put("/:id/:bookid/:field/:value", updateList);



export default router;