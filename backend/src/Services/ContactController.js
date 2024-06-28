import { paginateResult } from "../Helper/Paginate.js";
import ContactModel from "../Model/ContactModel.js";
import validator from 'indicative/validator.js';
import { errorJson, successJson } from "./Utilits/JsonRes.js";

export const store = async(req, res)=>{
    const{name, email, description} = req.body;
    try{
        validator.validateAll(req.body, {
            name:'required',
            email:'required|email',
            description:'required',
        }).then(async()=>{
            await ContactModel.create({
                name,
                email,
                description
            });
            return res.json(successJson('success',{}));
        }).catch((e)=>{
            return res.json(errorJson('validate_error',e))
        })
    }
    catch(error){
        console.log('error', error);
    }
}

export const all = async(req, res)=>{
    const {page} = req.query;
    const limit = 5;
    const sortField = '_id';
    const sortOrder = -1;

    const result = await paginateResult(ContactModel, page, limit, sortField, sortOrder);
    res.json(result);
}