import express from "express";
import { createProduct, deleteProducts, getProducts, updateProduct } from "../controles/productcontroler.js";

const productRouter = express.Router();

productRouter.post("/",createProduct)
productRouter.get("/",getProducts)
productRouter.delete("/:ProductID",deleteProducts)
productRouter.put("/:ProductID",updateProduct)
export default productRouter;