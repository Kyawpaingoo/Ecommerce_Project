import GenderModel from '../Model/GenderModel.js';
import BrandModel from '../Model/BrandModel.js';
import CategoryModel from '../Model/CategoryModel.js';
import ColorModel from '../Model/ColorModel.js';

export const getFilterData = async(req, res)=>{
    const gender = await GenderModel.find();
    const brand = await BrandModel.find();
    const category = await CategoryModel.find();
    const colors = await ColorModel.find();

    res.json({gender, brand, category, colors});
}