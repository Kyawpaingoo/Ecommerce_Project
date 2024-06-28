import { paginateResult } from "../Helper/PaginateHelper.js";
import { getSpecificData } from "../Helper/GetSpecificData.js";
import ReviewModel from "../Model/ReviewModel.js";
import validator from 'indicative/validator.js';
import { errorJson, successJson } from "./Utilits/JsonRes.js";

export const store = async(req, res)=>{
    const {name, email, review, rating} = req.body;
    try{
        validator.validateAll(req.body,{
            name:'required',
            email:'required|email',
            review:'required',
            rating:'required'
        }).then(async()=>{  
            await ReviewModel.create({
                name,
                email,
                review,
                rating
            });
            return res.json(successJson('success',{}));
        }).catch((e)=>{
            return res.json(errorJson('validate_error',e))
        })
       
    
        //res.json(data);
    }
    catch(error){
        console.log('error', error);
    }
}

export const all = async(req, res)=>{

    const{page, name} = req.query;
    const limit = 5;
    const sortField = "_id";
    const sortOrder = -1;

    const queryBuilder = [];
    if(name){
        queryBuilder.push({$name: {$search: name}});
    }

    const result = await paginateResult(ReviewModel, page, limit, sortField, sortOrder, queryBuilder);

    res.json(result);
}

export const getLastestReview = async(req, res)=>{
    const result = await getSpecificData(ReviewModel, 4, '_id', -1);
    res.json(result);
}