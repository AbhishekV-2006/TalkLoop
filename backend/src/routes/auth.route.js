import express from "express"

const router = express.Router();

router.get("/signup",(req,res)=>{
    res.send("HELLO")
})

router.get("/logout",(req,res)=>{

})

router.get("/login",(req,res)=>{

})

export default router;