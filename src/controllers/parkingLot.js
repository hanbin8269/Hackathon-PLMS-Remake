import Joi from 'joi';
import dotenv from 'dotenv';
import { parkingLot } from 'models';
import { decodeToken} from 'utils/token';

import {
    NONEXISTING_PARKING_LOT, NO_PERMISSIONS, COULD_NOT_LOAD_TOKEN, EXISTING_PARKING_LOT, INVALID_REQUEST_BODY_FORMAT, EXISTING_EMAIL, INVALID_ACCOUNT, UNVERIFIED_ACCOUNT, INVALID_VERIFICATION_CODE, INVALID_VERIFICATION_KEY
} from 'errors/error';
import { decode } from 'jsonwebtoken';
import { AUTH_REQUIRED } from '../errors/error';

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
    if(!token) throw AUTH_REQUIRED; // 로그인이 안되어있음 (토큰 X)
    var current_user_id = null;
    try{
        const decoded = await decodeToken(token);
        current_user_id = decoded.user_id
        ctx.body = decoded;
        console.log(decoded, decoded.user_id);
    } catch(e){
        throw COULD_NOT_LOAD_TOKEN;// 토큰을 불러오지 못함 
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
export const UpdateParkingLot = async (ctx) =>{
    const bodyFormat = Joi.object().keys({
        parkingLot_id : Joi.number().required(),
        name : Joi.string().required(),
        max_seat : Joi.number().required(),
        current_seat : Joi.number().required(),
        pos_x : Joi.number().required(),
        pos_y : Joi.number().required()
    });

    const Result = Joi.validate(ctx.request.body, bodyFormat);

    if (Result.error) throw INVALID_REQUEST_BODY_FORMAT;
        // 형식 검사

    const token = ctx.cookies.get('access_token');
    if(!token) throw AUTH_REQUIRED;
    var decodedToken = null;
    try {
        decodedToken = await decodeToken(token);
        console.log(decodedToken + "현재 로그인 한 유저의 ID : "+decodedToken.user_id);
    }catch (e){
        throw COULD_NOT_LOAD_TOKEN; // 토큰을 불러 올 수 없음
    }
    
    
    const result = await parkingLot.findOne({
        where : {
            "owner_id" : decodedToken.user_id,
            "parkingLot_id" : ctx.request.body.parkingLot_id
        }
    });
    // 현재 로그인 한 유저의 주차장 일 경우에만 변경 할 수 있게 만들기
    if (!result) throw NO_PERMISSIONS;

    await parkingLot.update({
        "name" : ctx.request.body.name,
        "max_seat" : ctx.request.body.max_seat,
        "current_seat" : ctx.request.body.current_seat,
        "pos_x" : ctx.request.body.pos_x,
        "pos_y" : ctx.request.body.pos_y,
    }, {
        where : {
            "parkingLot_id" : ctx.request.body.parkingLot_id
        }
    })

}

export const DeleteParkingLot = async (ctx) =>{
    const bodyFormat = Joi.object().keys({
        parkingLot_id : Joi.number().required()
    });

    const Result = Joi.validate(ctx.request.body, bodyFormat);

    if (Result.error) throw INVALID_REQUEST_BODY_FORMAT;

    // 주차장 삭제 권한이 있는지 확인
    const token = ctx.cookies.get('access_token');
    if (!token) throw AUTH_REQUIRED;
    var decodedToken = null;
    try {
        decodedToken = await decodeToken(token);
    }catch (e) {
        throw COULD_NOT_LOAD_TOKEN;
    }

    const result = await parkingLot.findOne({
        where : {
            "owner_id" : decodedToken.user_id,
            "parkingLot_id" : ctx.request.body.parkingLot_id  
        }
    });
    if (!result) throw NO_PERMISSIONS;
    const result_parkingLot_id = result["dataValues"]["parkingLot_id"];
    
    await parkingLot.destroy({
        where : {
            "parkingLot_id" : result_parkingLot_id
        }
    })
}

export const ReadParkingLot = async (ctx) =>{
    const bodyFormat = Joi.object().keys({
        parkingLot_id : Joi.number().required()
    });

    const Result = Joi.validate(ctx.request.body, bodyFormat);
    if (Result.error) throw INVALID_REQUEST_BODY_FORMAT;

    const parkingLot_info = await parkingLot.findOne({
        where : {
            "parkingLot_id" : ctx.request.body.parkingLot_id
        }
    });

    if (!parkingLot_info) throw NONEXISTING_PARKING_LOT;

    ctx.body = parkingLot_info["dataValues"];
}