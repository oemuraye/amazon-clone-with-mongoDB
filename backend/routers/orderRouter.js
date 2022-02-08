import express from "express";
import Order from "../models/orderModel";
import { isAuth } from "../utils";
import expressAsyncHandler from "express-async-handler";

const orderRouter = express.Router()

orderRouter.get('/:id', isAuth, expressAsyncHandler( async (req, res) => {
    const order = await Order.findById(req.params.id)
    if (order) {
        res.send(order)
    }
    return res.status(404).send({ message: 'Order Not Found'})
}))

orderRouter.post('/', isAuth, expressAsyncHandler( async (req, res) => {
    const order = new Order({
      orderItems: req.body.orderItems,
      user: req.user._id,
      shipping: req.body.shipping,
      payment: req.body.payment,
      itemsPrice: req.body.itemsPrice,
      taxPrice: req.body.taxPrice,
      shippingPrice: req.body.shippingPrice,
      totalPrice: req.body.totalPrice,
    });
    const createdOrder = await order.save()
        res
          .status(201)
          .send({ message: "New Order Created", order: createdOrder });
}))

orderRouter.put('/:id/pay', isAuth, expressAsyncHandler( async (req, res) => {
  const order = await Order.findById(req.params.id);
    if (order) {
      order.isPaid = true;
      order.paidAt = Date.now();
      order.payment.paymentResult = {
        payerID: req.body.payerID,
        paymentID: req.body.paymentID,
        orderID: req.body.orderID,
      };
      const updatedOrder = await order.save();
      res.send({ message: 'Order Paid', order: updatedOrder });
    } else {
      res.status(404).send({ message: 'Order Not Found.' });
    }
}))

orderRouter.post('/paystack/pay', (req, res) => {
    const form = _.pick(req.body, ['totalPrice', 'payerID', 'paymentID', 'orderID']);
    form.metadata = {
        full_name : form.payerID
    }
    form.totalPrice;
    initializePayment(form, (error, body)=>{
        if(error){
            //handle errors
            console.log(error);
            return;
       }
       response = JSON.parse(body);
       res.redirect(response.data.authorization_url)
    });
});

export default orderRouter