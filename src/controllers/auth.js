import Joi from 'joi';
import crypto from 'crypto';
import {user} from 'models';


export const Register = async(ctx) =>{
    const bodyFormat = Joi.object().keys({
        email: Joi.string().email().required(),
        password: Joi.string().required(),
    });

    const result = Joi.validate(ctx.request.body, bodyFormat);

    if (result.error){
        throw(500,e); // 형식에 맞지 않음
    }

    const existEmail = await user.findOne({email:ctx.request.body.email});

    if (existEmail != null){
        throw(500,e); // 이미 있는 이메일
    }
    
};