import express from "express";
import cors from "cors";

import mongoose from "mongoose";
import bodyParser from "body-parser";
import path from 'path'
import { fileURLToPath } from 'url'
import { dirname } from 'path'


import userRouter from "./routers/userRouter.js";
import productRouter from "./routers/productRouter.js";
import orderRouter from "./routers/orderRouter.js"
import uploadRouter from './routers/uploadRoute.js'
import config from "./config.js";
import dotenv from "dotenv";

dotenv.config();

mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useCreateIndex: true
})
.then(() => {
    console.log('Connected to mongodb')
})
.catch((error) => {
    console.log(error.message)
})

// const connectionURL = "mongodb://127.0.0.1:27017";
// const databaseName = "rutech-shopping";

// const main = async () => {
//   await mongoose.connect(connectionURL, {
//     useNewUrlParser: true,
//   });
//   console.log("connection successful");
// };
// main().catch((err) => console.log(err.message));

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use("/api/users", userRouter);

app.use("/api/products", productRouter);

app.use("/api/orders", orderRouter);

app.use("/api/uploads", uploadRouter);

// app.get("/api/paypal/clientId", (req, res) => {
//   res.send({ clientId: config.PAYPAL_CLIENT_ID })
// });

app.get("/api/paystack/clientId", (req, res) => {
  res.send({ clientId: process.env.PAYSTACK_SECRET})
})

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

app.use("/uploads", express.static(path.join(__dirname, "/../uploads")));
app.use(express.static(path.join(__dirname, "/../frontend")))

app.get("/", (req, res) => {
  res.sendFile(__dirname, '/../frontend/dist/index.html')
});

app.use((err, req, res, next) => {
  const status = err.name && err.name === "ValidationError" ? 400 : 500;
  res.status(status).send({ message: err.message })
})

app.listen(process.env.PORT || 5000, () => {
  console.log(`Serving at ${process.env.PORT || 5000}`)
});
