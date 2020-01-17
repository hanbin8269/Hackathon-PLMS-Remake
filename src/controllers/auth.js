// import Joi from 'joi';
// import crypto from 'crypto';
// import {user} from 'models';
const Joi = require('joi');
const crypto = require('crypto');
const { user } = require('models');

const dotenv = require('dotenv');

dotenv.config();

export const Register = async(ctx) =>{
    const bodyFormat = Joi.object().keys({
        email: Joi.string().email().required(),
        password: Joi.string().required(),
        name:Joi.string().required()
    });
    console.log(ctx.request.body);
    const result = Joi.validate(ctx.request.body, bodyFormat);
    if (result.error){
        throw(500,e); // 형식에 맞지 않음
    }

    const existEmail = await user.findOne({
        where: {
            email: ctx.request.body.email
        }
    });

    if (existEmail != null){
        throw(500,e); // 이미 있는 이메일
    }

    

    await user.create({
        "email":ctx.request.body.email,
        "password":
    });
    // 이메일 인증 추가
};