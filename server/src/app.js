import express, { json, urlencoded } from 'express';
import { connect } from 'mongoose';
import cors from 'cors';
import { config } from 'dotenv';
import helmet from 'helmet';
import morgan from 'morgan';


import clientRoutes from './routes/client.js';
import generalRoutes from './routes/general.js';
import managementRoutes from './routes/management.js';
import salesRoutes from './routes/sales.js';

import User from './models/User.js';
import Product from './models/Product.js';
import ProductStat from './models/ProductStat.js';
import Transaction from './models/Transaction.js';

import { dataUser, dataProduct, dataProductStat, dataTransaction, dataOverallStat } from './data/index.js';
import OverallStat from './models/OverallStat.js';

config();
const app = express();

app.use(json());
app.use(helmet());
app.use(morgan('dev'));
app.use(urlencoded({ extended: false }));
app.use(cors());

app.use('/client', clientRoutes);
app.use('/general', generalRoutes);
app.use('/management', managementRoutes);
app.use('/sales', salesRoutes);

const PORT = process.env.PORT || 9000;

connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(async () => {
    // User.insertMany(dataUser);
    // Product.insertMany(dataProduct);
    // ProductStat.insertMany(dataProductStat);
    // for (const productStat of dataProductStat) {
    //     const product = await Product.findById(productStat.productId);
    //     const createdProductStat = await ProductStat.create({
    //         product: productStat.productId,
    //         ...productStat
    //     });
    //     product.productStats.push(createdProductStat);
    //     const updatedProduct = await product.save();
    // }
    // Transaction.insertMany(dataTransaction);
    // OverallStat.insertMany(dataOverallStat);
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
}).catch(error => console.log('Unable to connect to Mongodb: ', error));