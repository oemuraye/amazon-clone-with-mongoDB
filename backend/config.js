import dotenv from 'dotenv'

dotenv.config();


export default {
  PORT: process.env.PORT,
  MONGODB_URL: process.env.MONGODB_URL,
  JWT_SECRET: process.env.JWT_SECRET,
  PAYPAL_CLIENT_ID: process.env.PAYPAL_CLIENT_ID,
  PAYSTACK_SECRET: process.env.PAYSTACK_SECRET
};