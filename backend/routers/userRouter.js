import express from 'express'
import User from '../models/userModel';

const userRouter = express.Router()

userRouter.get('/createadmin', async (res, req) => {
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
        res.statusCode(500).send(err.message)
    }
})

export default userRouter;