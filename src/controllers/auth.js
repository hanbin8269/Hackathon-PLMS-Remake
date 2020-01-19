// import Joi from 'joi';
// import crypto from 'crypto';
// import {user} from 'models';
const Joi = require('joi');
const crypto = require('crypto');
const { user } = require('models');

const dotenv = require('dotenv');

dotenv.config();

export const Login = async(ctx) =>{

    const bodyFormat = Joi.object().keys({
        email: Joi.string().email().required(),
        password: Joi.string().required()
    });

    const Result = Joi.validate(ctx.request.body, bodyFormat);

    if (Result.error){
        throw(500,Result.error);
    }

    // 있는 이메일인지 검사
    const account = await user.findOne({
        where: {
            email:ctx.request.body.email
        }
    });

    if (account == null){ 
        // 이메일 없음
        throw(500)
    }
    
    const input = crypto.createHmac('sha256', process.env.PASSWORD_KEY).update(ctx.request.body.password).digest('hex');

    if (account.password != input){
        // 계정의 비밀번호와 입력이 다를때
        throw(500);
    }

    // 토큰 생성
    let token = null;
    
}

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

    
    const password = crypto.createHmac('sha256',process.env.PASSWORD_KEY).update(ctx.request.body.password).digest('hex');

    await user.create({
        "email":ctx.request.body.email,
        "password": password,
        "name":ctx.request.body.name
    });
    // 이메일 인증 추가
    ctx.status = 204;
};