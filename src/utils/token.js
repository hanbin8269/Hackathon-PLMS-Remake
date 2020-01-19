import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

const jwtSecret = process.env.JWT_KEY;

export const generateToken = (payload) =>{
    return new Promise(
        (resolve, reject) =>{
            jwt.sign(
                payload,
                jwtSecret,
                {
                    expiresIn: '7d'
                },(error,token) =>{
                        if (error) reject(error);
                        resolve(token);
                }
            );
        }
    );
}