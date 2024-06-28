import dotenv from 'dotenv';
import CategoryModel from '../Model/CategoryModel.js';
import BrandModel from '../Model/BrandModel.js';
import slug from 'slug'
import mongoose from 'mongoose';
import GenderModel from '../Model/GenderModel.js';
import ColorModel from '../Model/ColorModel.js';

dotenv.config();
const mongourl = process.env.MONGO_URL;
mongoose.connect(mongourl).then(d=>{
    console.log('database conntected');
});

// const gender = ['Men', 'Women', 'Kids'];
// const category = ['Atheltic', 'Casual', 'Fashion', 'Teen'];
// const brand = ['Nike','Adidas', 'ERKE','Puma', 'Converse'];
const color = ['Orange', 'Yellow','Purple'];

(
    async()=>{
        // gender.map(async(d)=>{
        //     await GenderModel.create({
        //         slug: slug(d),
        //         gender: d,
        //     });
        // });

        // category.map(async(d)=>{
        //     await CategoryModel.create({
        //         slug: slug(d),
        //         category: d,
        //     });
        // });

        // brand.map(async(d)=>{
        //     await BrandModel.create({
        //         slug: slug(d),
        //         brand: d,
        //     });
        // });

        color.map(async(d)=>[
            await ColorModel.create({
                slug: slug(d),
                color: d
            })
        ])
        
        console.log('seeding success')
    }
)();