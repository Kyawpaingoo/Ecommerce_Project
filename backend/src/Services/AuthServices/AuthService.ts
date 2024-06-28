import { IUser } from "../../Model/UserModel";
import { IRepository } from "../../Repository/IRepository";
import { errorJson, IJsonResponse } from "../Utilits/JsonRes";
import { IAuthService } from "./IAuthService";
import jwt from 'jsonwebtoken';
import { Request, Response } from "express";
import { validator } from "indicative";
import bcrypt from 'bcryptjs';

export class AuthService implements IAuthService {
    private repository: IRepository<IUser>;
    private readonly jwt_secret: string | undefined;

    constructor(repository: IRepository<IUser>) {
        this.repository = repository;
        this.jwt_secret = process.env.JWT_TOKEN;
    }

    public register = async (req: Request, res: Response): Promise<any> => {
        const { name, email, password } = req.body;
        const users = await this.repository.GetAll();
        const findUser = users.find((user) => user.email === email);
        if(findUser) {
            const errorResponse: IJsonResponse = errorJson("Email Exist", null);
            return res.status(400).json(errorResponse);
        }

        validator.validateAll(req.body, {
            name: "required",
            email:"required|email",
            password:"required|min:4"
        }).then(async () => {
            const salt = bcrypt.genSaltSync(10);
            const hashPassword = bcrypt.hashSync(password, salt);
            const createUser = await this.repository.InsertReturnAsync({password: hashPassword,...req.body});
            return res.json({success: true, message: "success", data: {_id: createUser._id, name: createUser.name}});
        })
    }

    private generateAccessToken: (payload: any) => Promise<string> = async (payload) => {
        const jwt_secrect = process.env.JWT_TOKEN;
        const access_token = jwt.sign(payload, jwt_secrect as string);
        return access_token;
    }
}