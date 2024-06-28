import { errorJson } from '../Services/Utilits/JsonRes';
import { Request, Response, NextFunction } from 'express';
import { verify, Secret, JwtPayload } from 'jsonwebtoken';
import { IAuth } from './ICheckAuth';

class Auth implements IAuth {
    private readonly jwt_secret: string | undefined;

    constructor() {
        this.jwt_secret = process.env.JWT_TOKEN;
    }

    public checkAuth = (req: Request, res: Response, next: NextFunction): Response<any, Record<string, any>> | void => {
        const { access_token } = req.cookies;

        if (!this.jwt_secret) {
            return res.json({error: 'not_auth'});
        }

        try {
            const data: string | JwtPayload
            = verify(access_token, this.jwt_secret as string);
            req.AuthUser = data as JwtPayload;
            next();
        } catch (error) {
            res.json('not_auth');
        }
    };

    public checkAuthorize = (role: string) => (req: Request, res: Response, next: NextFunction): void => {
        const { access_token } = req.cookies;

        if (access_token && req.AuthUser?.role === role) {
            next();
        } else {
            res.json(errorJson('Forbidden', null));
        }
    };
}

export default new Auth();