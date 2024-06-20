import UserModel from "../Model/UserModel.js"
import validator from 'indicative/validator.js';
import {successJson, errorJson} from './Utilits/JsonRes.js';
import bcrypt from 'bcryptjs';
import { paginateResult } from "../Helper/Paginate.js";

export const getUserList = async(req, res)=>{
    const {page, name, email} = req.query;
    const limit  = 30;
    const sortField = '_id';
    const sortOrder = -1;

    const queryBuilder = [];
    if(name){
        queryBuilder.push({$text: {$search: name}});
    }
    if (email) {
        queryBuilder.push({"email": email})
      }
    const result = await paginateResult(UserModel, page, limit, sortField, sortOrder, queryBuilder);
    res.json(result);
}

export const createUser = async (req, res)=>{
    const {name, email, password, role} = req.body;
    const findUser = await UserModel.findOne({email});

    if(findUser){
        return res.json(errorJson("Email Exist", null));
    } 
    else{
        validator.validateAll(req.body, {
            name: "required",
            email:"required|email",
            password:"required|min:4"
        }).then(async()=>{
            const salt = bcrypt.genSaltSync(10);
            const hashPassword = bcrypt.hashSync(password, salt);
            const createUser = await UserModel.create({
                name,
                email,
                password: hashPassword,
                role
            });

            return res.json(successJson('success',{
                id: createUser._id,
                name: createUser.name
            }));
        }).catch((e)=>{
            return res.json(errorJson('validate_error',e))
        })
    }
}