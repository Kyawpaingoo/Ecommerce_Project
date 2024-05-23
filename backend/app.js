import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import AuthRouter from './Router/AuthRouter.js';
import fileUpload from 'express-fileupload';
import AdminRouter from './Router/AdminRouter.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import ReviewRouter from './Router/ReviewRouter.js';
import ContactRouter from './Router/ContactRouter.js';
import DataRouter from './Router/DateRouter.js';
import ProductRouter from './Router/ProductRouter.js';
import OrderRouter from './Router/OrderRouter.js';
import OrderDetailRouter from './Router/OrderDetailRouter.js';
import AnalyticsRouter from './Router/AnalyticsRouter.js';

dotenv.config();
const app = express();
const port = process.env.PORT;
const mongodb = process.env.MONGO_URL;
const allowedOrigins = ["http://localhost:5173", "http://localhost:5174"];

const corsOptions = {
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true
  };

app.use(cors(corsOptions));
app.use(express.json());
app.use(fileUpload());
app.use(express.static('Public'))
app.use(cookieParser());

mongoose.connect(mongodb).then(()=>{
    console.log('database connected')
})

app.use('/api', AuthRouter);
app.use('/api/admin', AdminRouter);
app.use('/api/review', ReviewRouter);
app.use('/api/contact', ContactRouter);
app.use('/api/data', DataRouter);
app.use('/api/product', ProductRouter);
app.use('/api/order', OrderRouter);
app.use('/api/orderDetail', OrderDetailRouter);
app.use('/api/analytic/', AnalyticsRouter)
app.listen(port, ()=>{
    console.log(`server is running on port: ${port}`);
});

// Mail sending service
// https://medium.com/coox-tech/send-mail-using-node-js-express-js-with-nodemailer-93f4d62c83ee