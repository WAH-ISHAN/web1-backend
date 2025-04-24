import mongoose from "mongoose";


const orderSchema = new mongoose.Schema({

    orderID: {
        type: String,
        required: true,
        unique: true 
    },

    date:{
        type: Date,
        required: true,
        default: Date.now // default to current date and time
    },
    email:{
        type: String,
        required: true
        
    },
    Name:{
        type: String,
        required: true
    },  
    Address:{
        type: String,
        required: true
    },
    Phone:{
        type: String,
        required: true
    }, 
   
    Status: {
        type: String,
        required: true,
        default: "Pending" // default status is "Pending"
    },
    billitem: {
        type: [
            {
                ProductID: String,
                ProductName: String,
                ProductPrice: Number,
                ProductQuantity: Number
            }
        ],
        required: true
    },
    TotalPrice: {
        type: Number,
        required: true
    },

})
const Orderz = mongoose.model("Order", orderSchema);

export default Orderz;
// Order model for managing orders in the e-commerce application