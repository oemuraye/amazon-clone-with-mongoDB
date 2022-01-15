import express from 'express'
import cors from 'cors'
import data from './data'
import mongoose from 'mongoose'
import config from './config'


mongoose.connect(config.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useCreateIndex: true
})
.then(() => {
    console.log('Connected to mongodb');
})
.catch((error) => {
    console.log(error.message)
})

const app = express()

app.use(cors())

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


app.listen(5000, () => {
    console.log("Serving at 5000");
})