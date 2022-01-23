import express from 'express'
import cors from 'cors'
import data from './data'

import mongoose from 'mongoose'
// import config from './config'

import userRouter from './routers/userRouter'
import bodyParser from 'body-parser'

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
  console.log('connection successful')
}

main().catch((err) => console.log(err.message))

const app = express()

app.use(cors())
app.use(bodyParser.json())

app.use('/api/users', userRouter)

app.get("/api/products", (req, res) => {
    res.send(data.products)
})

app.get('/api/products/:id', (req, res) => {
    const product = data.products.find((x) => x._id === req.params.id);
    if (product) { 
        res.send(product)
    } else {
       res.status(404).send({message: 'product Not Found!'}) 
    }
})

app.use((err, req, res, next) => {
  const status = err.name && err.name === 'ValidationError' ? 400 : 500;
  res.status(status).send({message: err.message})
})

app.listen(5000, () => {
    console.log("Serving at 5000")
})