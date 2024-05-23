import jwt from 'jsonwebtoken';
import { errorJson } from '../Controller/Utilits/JsonRes.js';

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
        req.AuthUser = data;
        console.log(req.AuthUser)
        next();
    })
}

export const checkAuthorize = (role) => (req, res, next)=>{
    const {access_token} = req.cookies;
    if(access_token && req.AuthUser && req.AuthUser.role == role){
        next();
    }
    else{
        return res.json(errorJson('Forbidden', null));
    }
}


