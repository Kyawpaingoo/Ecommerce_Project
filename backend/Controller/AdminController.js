import UserModel from "../Model/UserModel.js"
import validator from 'indicative/validator.js';
import {successJson, errorJson} from './Utilits/JsonRes.js';
import bcrypt from 'bcryptjs';

export const getUserList = async(req, res)=>{
    const result = await UserModel.find();
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