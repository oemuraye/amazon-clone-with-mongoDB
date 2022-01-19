import express from 'express'
import User from '../models/userModel';

const userRouter = express.Router()

userRouter.get('/createadmin', async (req, res) => {
    try {
        const user = new User({
            name: 'admin',
            email: 'admin@example.com',
            password: '12/12/12',
            isAdmin: true
        })
        const createUser = await user.save()
        res.send(createUser)
    } catch (err) {
        res.status(500).send(err.message)
    }
})

userRouter.get('/blessing', async (req, res) => {
    res.send('blessing')
})

userRouter.post('/signin', async (req, res) => {
    const signinUser = await User.findOne({
      email: req.body.email,
      password: req.body.password,
    })
    if (!signinUser) {
         res.status(401).send({
           message: "Invalid Email or Password",
         })
    }

})

export default userRouter;