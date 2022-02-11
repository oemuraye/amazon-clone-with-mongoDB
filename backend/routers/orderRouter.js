import express from "express";
import Order from "../models/orderModel";
import { isAuth } from "../utils";
import expressAsyncHandler from "express-async-handler";

const orderRouter = express.Router();

orderRouter.get(
  "/:id",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (order) {
      res.send(order);
    }
    return res.status(404).send({ message: "Order Not Found" });
  })
);

orderRouter.post(
  "/",
  isAuth,
  expressAsyncHandler(async (req, res) => {
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
    const createdOrder = await order.save();
    res.status(201).send({ message: "New Order Created", order: createdOrder });
  })
);

orderRouter.put(
  "/:id/pay",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    implementi;
  })
);

export default orderRouter;
