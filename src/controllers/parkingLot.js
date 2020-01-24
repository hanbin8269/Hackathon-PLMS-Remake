import Joi from 'joi';
import dotenv from 'dotenv';
import { parkingLot } from 'models';
import {
    INVALID_REQUEST_BODY_FORMAT, EXISTING_EMAIL, INVALID_ACCOUNT, UNVERIFIED_ACCOUNT, INVALID_VERIFICATION_CODE, INVALID_VERIFICATION_KEY
} from 'errors/error';

export const CreateParkingLot = async (ctx) => {
    const bodyFormat = Joi.object().keys({
        parkingLot_id : Joi.number().required(),
        //name : Joi.string().required(),
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