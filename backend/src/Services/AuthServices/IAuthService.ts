import { Request, Response } from "express";

export interface IAuthService {
    register: (req: Request, res: Response) => Promise<any>;
    // login: (req: Request, res: Response) => Promise<any>;
    // logout: (req: Request, res: Response) => Promise<void>;
}