import express from "express"
import { signup } from "../controllers/auth.controllers.js";

const router = express.Router();

router.post("/signup",signup)

router.get("/logout",(req,res)=>{
    res.send("LOGOUT")
})

router.get("/login",(req,res)=>{
    res.send("LOGIN")
})

export default router