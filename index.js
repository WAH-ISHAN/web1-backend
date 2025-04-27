import express from "express";
import bodyParser from "body-parser";
import nodemon from "nodemon";
import mongoose from "mongoose";
import userRouter from "./router/userrouter.js";
import productRouter from "./router/productrouter.js";
import verifyjwt from "./middleware/auth.js";
import orderRouter from "./router/orderrouter.js";
import dotenv from "dotenv";
dotenv.config();
let app=express();


mongoose.connect(process.env.MONGODB).then(
    () => console.log("connected to mongodb")
).catch(
    () => console.log("not connected to mongodb")
) 

app.use(bodyParser.json());

app.use(verifyjwt)


//api end poits
app.use("/api/user",userRouter);
app.use("/api/product",productRouter)
app.use("/api/order",orderRouter)


app.listen(3000,()=>
    {console.log
        ("server is running on port 3000");
    })