import Orderz from "../models/order.js";
import Product from "../models/productes.js"

export async function createOrder(req,res){
    if (req.user == null) {
		res.status(401).json({
			message: "Unauthorized",
		});
		return;
	}

    const body = req.body;
    const OrderData = {
        OrderID: "",
        date: req.user.date,
        email: req.user.email,
        Name: body.Name,
        Address: body.Address,
        Phone: body.Phone,
        billitem: [],
        Status: "Pending",
        TotalPrice: 0
    };


    Orderz.find()
        .sort({
            date : -1
        })
    .limit(1)
    .then(async (lastBill) => {
        if(lastBill.length == 0){
            OrderData.OrderID="Order0001";
        }else{
            const lastBill = lastBill[0];
            const lastOrderID = lastBill.OrderID ;
            const lastOrderNumber = lastOrderID.replace("Order", "");
            const lastOrderNumberInt = parseInt(lastOrderNumber);
            const newOrderNumberInt = lastOrderNumberInt + 1;
            const newOrderNumber = newOrderNumberInt.toString().padStart(4, "0");
            OrderData.OrderID = "Order" + newOrderNumber;
        }
        // check and process each bill item
    for (let i = 0; i < body.billitem.length; i++) {
        const product = await Product.findOne({
            ProductID: body.billitem[i].ProductID,
        });

        if (product == null) {
            res.status(404).json({
                message:
                    "Product with product id " +
                    body.billItems[i].productId +
                    " not found",
            });
            return;
        }


        OrderData.billitem[i] = {
            ProductID: product.ProductID,
            ProductName: product.ProductName,
            ProductImage: product.ProductImage,
            ProductPrice: product.ProductPrice,
        };
        OrderData.TotalPrice =
            OrderData.TotalPrice + product.ProductPrice * body.billitem[i].quantity;
    }

const order = new Orderz(OrderData);

order
.save()
.then(() => {
    res.json({
        message: "Order saved successfully",
    });
})
.catch((err) => {
    console.log(err);
    res.status(500).json({
        message: "Order not saved",
    });
});

    
});


}


export function getOrderlist(req, res) {
    if (req.user == null) {
		res.status(401).json({
			message: "Unauthorized",
		});
		return;
	}

    if (req.user.UserType == "Admin") {
        Orderz.find()
            .then((orders) => {
                res.status(200).json(orders);
            })
            .catch((error) => {
                res.status(500).json({
					message: "Orders not found",
				});
            });
    } else {
        Orderz.find({
            email:req.user.email
        }).then(
            (orders) => {
                res.status(200).json(orders);
            })
            .catch((err) => {
				res.status(500).json({
					message: "Orders not found",
				});
			});
    }
}
export async function updateOrder(req,res){
	try{
		if(req.user == null){
			res.status(401).json({
				message : "Unauthorized"
			})
			return
		}

		if(req.user.role != "admin"){
			res.status(403).json({
				message : "You are not authorized to update an order"
			})
			return
		}

		const orderId = req.params.orderId
		const order = await Orderz.findOneAndUpdate({orderId : orderId},req.body)

		res.json({
			message : "Order updated successfully"
		})
	}catch(err){
		res.status(500).json({
			message : "Order not updated"
		})
	}
}