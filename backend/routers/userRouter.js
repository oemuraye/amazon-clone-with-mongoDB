import express from 'express'
import expressAsyncHandler from 'express-async-handler';

import User from '../models/userModel';
import { generateToken } from '../utils';

const userRouter = express.Router()

userRouter.get('/createadmin', expressAsyncHandler( async (req, res) => {
    try {
        const user = new User({
            name: 'administration',
            email: 'admina@example.com',
            password: '12/12/12',
            isAdmin: true
        })
        const createUser = await user.save()
        res.send(createUser)
    } catch (err) {
        res.status(500).send(err.message)
    }
}))

userRouter.post('/signin', expressAsyncHandler( async (req, res) => {
    const signinUser = await User.findOne({
      email: req.body.email,
      password: req.body.password,
    })
    if (!signinUser) {
         res.status(401).send({
           message: "Invalid Email or Password",
         })
    } else {
        res.send({
          _id: signinUser._id,
          name: signinUser.name,
          email: signinUser.email,
          isAdmin: signinUser.isAdmin,
          token: generateToken(signinUser),
        });
    }

}))

export default userRouter;