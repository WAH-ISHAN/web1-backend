import express from "express";
import bodyParser from "body-parser";
import nodemon from "nodemon";
import mongoose from "mongoose";
import userRouter from "./router/userrouter.js";
import productRouter from "./router/productrouter.js";
import verifyjwt from "./middleware/auth.js";
import orderRouter from "./router/orderrouter.js";

let app=express();


mongoose.connect("mongodb+srv://admin:admin123@cluster0.18fozpb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0").then(
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