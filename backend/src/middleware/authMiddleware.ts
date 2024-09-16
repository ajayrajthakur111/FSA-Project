import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User';

interface CustomRequest extends Request {
    user?: any;
}

export const protect = async (req: CustomRequest, res: Response, next: NextFunction) => {
    const token = req.headers['authorization']?.split(' ')[1];
    console.log("tokennnn", token)
    if (!token) return res.status(401).json({ message: 'No token provided' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as jwt.JwtPayload;
        console.log("decoded", decoded)
        const currentTimestamp = Math.floor(new Date().getTime() / 1000);
        const expi = decoded.exp
        console.log(currentTimestamp);
        if (decoded) {
            if (currentTimestamp > Number(expi)) {
                return res.status(401).json({ message: 'Token expired' });
            }
            else {
                next();
            }
        }
    } catch (error) {
        if (error instanceof jwt.JsonWebTokenError) {
            return res.status(401).json({ message: 'Token is not valid' });
        }
        if (error instanceof jwt.TokenExpiredError) {
            return res.status(401).json({ message: 'Token has expired' });
        }
        res.status(500).json({ message: 'Internal server error' });
    }
};