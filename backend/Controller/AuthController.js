import validator from 'indicative/validator.js';
import {successJson, errorJson} from './Utilits/JsonRes.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import UserModel from '../Model/UserModel.js';

export const register = async (req, res)=>{
    
    const {name, email, password} = req.body;
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
                role: 'user'
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

export const login = async (req, res)=>{
    const {name, email, password} = req.body;

    const findUser = await UserModel.findOne({email});
    if(!findUser){
        return res.json(errorJson('email not found', null));
    } else{
        const verifyPasssword = bcrypt.compareSync(password, findUser.password);

        if(!verifyPasssword){
            return res.json(errorJson('wrong password', null));
        }

        const access_token = generateAccessToken({name: findUser.name, _id: findUser.id, role: findUser.role});     

        res.cookie('access_token', access_token, {httpOnly: true});
        
        return res.json(successJson('success', {id:findUser._id, name: findUser.name, role: findUser.role}));
    }
}

export const logout = async (req,  res)=>{
    res.clearCookie('access_token');
    res.clearCookie('refresh_token');
    res.json('success');
}

const generateAccessToken = (payload) =>{
    const jwt_secrect = process.env.JWT_TOKEN;
    const access_token = jwt.sign(payload, jwt_secrect);
    return access_token;
}

export const checkAuth = (req, res, next)=>{
    const {access_token} = req.cookies;
    const jwt_secrect = process.env.JWT_TOKEN;
    
    if(!jwt_secrect){
        return res.json('not_auth');
    }

    jwt.verify(access_token, jwt_secrect, (error,data)=>{
        if(error){
            return res.json('not_auth');
        }
        return res.json(data);
    })
}
