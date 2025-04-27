import Orderz from "../models/order.js";


export function createOrder(req,res){
    
    if(req.user == null){
        res.status(403).json({
            message: "Unauthorized"
        })
        return;
    }
    const OrderDetails = req.body;
    

    const OrderData = {
        orderID: "",
        date: OrderDetails.date,
        email: OrderDetails.email,
        Name: OrderDetails.Name,
        Address: OrderDetails.Address,
        Phone: OrderDetails.Phone,
        billitem:[],
       Status: "Pending",
        TotalPrice: 0
    }
    const lastBill = Orderz.find().sort({date : -1}).limit(1);

    if(lastBill.length == 0){
        OrderData.OrderID ="Order0001"
    }else{
        const lastOrder = lastBill[0];
        const lastOrderID = lastOrder.OrderID ;
        const lastOrderNumber = lastOrderID.replace("Order", "");
        const lastOrderNumberInt = parseInt(lastOrderNumber);
        const newOrderNumberInt = lastOrderNumberInt + 1;
        const newOrderNumber = newOrderNumberInt.toString().padStart(4, "0");
        OrderData.OrderID = "Order" + newOrderNumber;
    }
    
    // check and process each bill item
    for (let i=0; i<body.billitem.length; i++){
        const billitem = body.billitem[i];

        //check

    }

    const Order = new Orders(orderData);
    Orders.save()
    .then((result) => {
        res.status(201).json({
            message: "Order created successfully",
            order: result
        })
}).catch((error) => {
    console.error("Error creating order:", error);
    res.status(500).json({ message: "Internal server error", error });
})
}
export function getOrderlist(req, res) {
    if (req.user) {
        return res.status(403).json({ message: "Unauthorized" });
    }

    if (req.user.UserType == "Admin") {
        Order.find()
            .then((orders) => {
                res.status(200).json(Orders);
            })
            .catch((error) => {
                console.error("Error fetching orders:", error);
                res.status(500).json({ message: "Internal server error", error });
            });
    } else {
        Order.find({
            email:req.user.email
        }).then(
            (orders) => {
                res.status(200).json(Orders);
            })
            .catch((error) => {
                console.error("Error fetching orders:", error);
                res.status(500).json({ message: "Internal server error", error });
            }
        )
    }
}