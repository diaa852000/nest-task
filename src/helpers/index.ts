import { HttpException, HttpStatus, UnauthorizedException } from "@nestjs/common";
import mongoose from "mongoose";
import IResponse from "src/config/response";

export function isValidObjectId(id: string): boolean {
    return mongoose.Types.ObjectId.isValid(id);
}

export function showErrorResponse(message: string, status: HttpStatus): IResponse<null> {
    const error = new HttpException(message, status);

    return {
        success: false,
        data: null,
        message: error.message,
        error: {
            statusCode: error.getStatus(),
            name: error.name
        }
    }
}

export function catchUpServerError(message: string): HttpException{
    throw new HttpException(message, HttpStatus.INTERNAL_SERVER_ERROR)
}

export function showUnAuthorizedError(message: string): never {
    throw new UnauthorizedException(message);
}
