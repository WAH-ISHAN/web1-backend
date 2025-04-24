import Product from "../models/productes.js";

export async function createProduct(req, res) {
    if (req.user == null) {
        res.status(403).json({
            message: "You need to login first"
        });
        return;
    }

    if (req.user.role !== "admin") {
        res.status(403).json({
            message: "You are not authorized to create a product"
        });
        return;
    }

    const product = new Product(req.body);
    try{
        await product.save()
        res.json({
            message: "Product created successfully"
        })
    }catch(error){
        res.status(500).json({
            message: "Error in creating product"
        })
    }
    
}

export function getProducts(req,res) {
    Product.find()
        .then((products) => {
            res.status(200).json(products);
        })
        .catch((error) => {
            res.status(500).json({
                message: "Error in fetching products",
               
            });
        });
}
    export function deleteProducts(req, res) {
        Product.findOneAndDelete(
            {
                 ProductID: req.params.id 
            }
        ).then((product) => {
            if (!product) {
                return res.status(404).json({
                    message: "Product not deleted",
                });
            }
            
        }).catch((error) => {
            res.status(500).json({
                message: "Error in deleting product",
                error: error.message
            });
        });
    }
    export function updateProduct(req, res) {
        Product.findOneAndUpdate(
            {
                ProductID: req.params.id
            },req.body).then(() => {
                res.status(200).json({
                    message: "Product updated successfully",
                });
            }).catch((error) => {
                res.status(500).json({
                    message: "Error in updating product",
                    error: error.message
                });
            });
    }