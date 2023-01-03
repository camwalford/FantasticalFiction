import express from "express";
import { addToList, deleteFromList, getLists, getList, updateList } from "../controllers/booklistCont.js";


const router = express.Router();

router.get("/", getLists);
router.get("/:id", getList);
router.post("/", addToList);
router.delete("/:id", deleteFromList);
router.put("/:id", updateList);



export default router;