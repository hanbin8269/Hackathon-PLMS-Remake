import Joi from 'joi';
import dotenv from 'dotenv';
import { parkingLot } from 'models';
import { decodeToken} from 'utils/token';

import {
    EXISTING_PARKING_LOT, INVALID_REQUEST_BODY_FORMAT, EXISTING_EMAIL, INVALID_ACCOUNT, UNVERIFIED_ACCOUNT, INVALID_VERIFICATION_CODE, INVALID_VERIFICATION_KEY
} from 'errors/error';
import { decode } from 'jsonwebtoken';

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
        throw EXISTING_PARKING_LOT; // 이미 있는 주차장 (error 추가 예정)
    }

    const token = ctx.cookies.get('access_token');
    if(!token) throw INVALID_VERIFICATION_KEY; // 로그인이 안되어있음 (토큰 X)
    var current_user_id = null;
    try{
        const decoded = await decodeToken(token);
        current_user_id = decoded.user_id
        ctx.body = decoded;
        console.log(decoded, decoded.user_id);
    } catch(e){
        ctx.body = 'error';
    }

    await parkingLot.create({
        "owner_id" : current_user_id,
        "name" : ctx.request.body.name,
        "max_seat" : ctx.request.body.max_seat,
        "current_seat" : ctx.request.body.current_seat,
        "pos_x" : ctx.request.body.pos_x,
        "pos_y" : ctx.request.body.pos_y
        // 주차장 주인 정보 (owner_id)
    })
}
export const UpdateParkingLot = (ctx) =>{
    const bodyParser = Joi.object().keys({
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

}
