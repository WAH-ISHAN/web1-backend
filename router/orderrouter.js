import express from "express";
import { createOrder, getOrderlist } from "../controles/ordercontroller.js";
import e from "express";

const orderrouter = express.Router();

orderrouter.post("/",createOrder)
orderrouter.get("/",getOrderlist)

export default orderrouter;