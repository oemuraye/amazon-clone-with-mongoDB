import express from "express";
import cors from "cors";
import data from "./data";

import mongoose from "mongoose";
import bodyParser from "body-parser";
import path from 'path'

import userRouter from "./routers/userRouter";
import productRouter from "./routers/productRouter";
import orderRouter from "./routers/orderRouter";
import uploadRouter from './routers/uploadRoute'
import config from "./config";

// mongoose.connect(config.MONGODB_URL, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     // useCreateIndex: true
// })
// .then(() => {
//     console.log('Connected to mongodb');
// })
// .catch((error) => {
//     console.log(error.message)
// })

const connectionURL = "mongodb://127.0.0.1:27017";
const databaseName = "rutech-shopping";

const main = async () => {
  await mongoose.connect(connectionURL, {
    useNewUrlParser: true,
  });
  console.log("connection successful");
};

main().catch((err) => console.log(err.message));

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use("/api/users", userRouter);

app.use("/api/products", productRouter);

app.use("/api/orders", orderRouter);

app.use("/api/uploads", uploadRouter);

app.get("/api/paypal/clientId", (req, res) => {
  res.send({ clientId: config.PAYPAL_CLIENT_ID })
});

app.get("/api/paystack/clientId", (req, res) => {
  res.send({ clientId: config.PAYSTACK_SECRET})
})

app.use("/uploads", express.static(path.join(__dirname, "/../uploads")));
app.use(express.static(path.join(__dirname, "/../frontend")))
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, '/../frontend/index.html'))
});

app.use((err, req, res, next) => {
  const status = err.name && err.name === "ValidationError" ? 400 : 500;
  res.status(status).send({ message: err.message });
});

app.listen(5000, () => {
  console.log("Serving at 5000")
});
