import { Request, Response, NextFunction } from 'express';

export interface IAuth {
    checkAuth(req: Request, res: Response, next: NextFunction): Response<any, Record<string, any>> | void
    checkAuthorize(role: string): (req: Request, res: Response, next: NextFunction) => void
}

