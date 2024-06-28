"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
// import AdminRouter from './Router/AdminRouter.js';
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const AuthRouter_1 = __importDefault(require("./src/Router/AuthRouter"));
// import ReviewRouter from './Router/ReviewRouter.js';
// import ContactRouter from './Router/ContactRouter.js';
// import DataRouter from './Router/DateRouter.js';
// import ProductRouter from './Router/ProductRouter.js';
// import OrderRouter from './Router/OrderRouter.js';
// import OrderDetailRouter from './Router/OrderDetailRouter.js';
// import AnalyticsRouter from './Router/AnalyticsRouter.js';
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT;
const mongodb = process.env.MONGO_URL;
const allowedOrigins = ["http://localhost:5173", "http://localhost:5174"];
const corsOptions = {
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        }
        else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true
};
app.use((0, cors_1.default)(corsOptions));
app.use(express_1.default.json());
app.use((0, express_fileupload_1.default)());
app.use(express_1.default.static('Public'));
app.use((0, cookie_parser_1.default)());
mongoose_1.default.connect(mongodb).then(() => {
    console.log('database connected');
});
app.use('/api', AuthRouter_1.default);
// app.use('/api/admin', AdminRouter);
// app.use('/api/review', ReviewRouter);
// app.use('/api/contact', ContactRouter);
// app.use('/api/data', DataRouter);
// app.use('/api/product', ProductRouter);
// app.use('/api/order', OrderRouter);
// app.use('/api/orderDetail', OrderDetailRouter);
// app.use('/api/analytic/', AnalyticsRouter)
app.listen(port, () => {
    console.log(`server is running on port: ${port}`);
});
// Mail sending service
// https://medium.com/coox-tech/send-mail-using-node-js-express-js-with-nodemailer-93f4d62c83ee
