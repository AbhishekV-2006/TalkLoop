import express from "express"
import dotenv from "dotenv"
import path from "path"


import authRoutes from "./routes/auth.route.js"
import messageRoutes from "./routes/message.route.js"
import {connectDB} from "./lib/db.js"
import cors from "cors";
import cookieParser from "cookie-parser"
import { ENV } from "./lib/env.js"
import { verifyMailer } from "./emails/emailHandlers.js"
dotenv.config();

import {app ,server } from "./lib/socket.js"

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

app.use(cors({origin:ENV.CLIENT_URL,credentials:true}))
app.use(cookieParser());

const __dirname=path.resolve();
const PORT = ENV.PORT || 8000

app.use("/api/auth",authRoutes);
app.use("/api/messages",messageRoutes);

if(ENV.NODE_ENV ==="production"){
    app.use(express.static(path.join(__dirname,"..","frontend","dist")))

    app.get("*",(req,res)=>{
        res.sendFile(path.join(__dirname,"..","frontend","dist","index.html"))

    })
}
server.listen(PORT,()=>{
    console.log("Server started at "+ PORT)
    connectDB();
    verifyMailer().then(() => {
        console.log("Nodemailer transporter verified")
    }).catch((error) => {
        console.error("Nodemailer transporter verification failed", error)
    })
})
 