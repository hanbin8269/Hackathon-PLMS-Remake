import Joi from 'joi';
import dotenv from 'dotenv';
import { parkingLot } from 'models';
import { decodeToken} from 'utils/token';

import {
    INVALID_REQUEST_BODY_FORMAT, EXISTING_EMAIL, INVALID_ACCOUNT, UNVERIFIED_ACCOUNT, INVALID_VERIFICATION_CODE, INVALID_VERIFICATION_KEY
} from 'errors/error';

export const CreateParkingLot = async (ctx) => {
    const bodyFormat = Joi.object().keys({
        name : Joi.string().required(),
        max_seat : Joi.number().required(),
        current_seat : Joi.number().required(),
        pos_x : Joi.number().required(),
        pos_y : Joi.number().required()
    });

    const Result = Joi.validate(ctx.request.body, bodyFormat);

    if (Result.error){
        throw INVALID_REQUEST_BODY_FORMAT;
    }


    const account = await parkingLot.findOne({
    // 완전히 똑같은 주차장이 있을 때
        where : {
            name:ctx.request.body.name,
            max_seat:ctx.request.body.max_seat,
            current_seat:ctx.request.body.current_seat,
            pos_x:ctx.request.body.pos_x,
            pos_y:ctx.request.body.pos_y
        }
    });
    if (account){
        throw EXISTING_EMAIL; // 이미 있는 주차장 (error 추가 예정)
    }

    const token = ctx.cookies.get('access_token');
    if(!token) throw INVALID_VERIFICATION_KEY; // 로그인이 안되어있음 (토큰 X)
    
    try{
        const decoded = await decodeToken(token);

        ctx.body = decoded;
    } catch(e){
        ctx.body = 'error';
    }

    await parkingLot.create({
        "name" : ctx.request.body.name,
        "max_seat" : ctx.request.body.max_seat,
        "current_seat" : ctx.request.body.current_seat,
        "pos_x" : ctx.request.body.pos_x,
        "pos_y" : ctx.request.body.pos_y
        // 주차장 주인 정보
    })
}

