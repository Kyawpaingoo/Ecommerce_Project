import GenderModel from '../Model/GenderModel.js';
import BrandModel from '../Model/BrandModel.js';
import CategoryModel from '../Model/CategoryModel.js';

export const getFilterData = async(req, res)=>{
    const gender = await GenderModel.find();
    const brand = await BrandModel.find();
    const category = await CategoryModel.find();

    res.json({gender, brand, category});
}