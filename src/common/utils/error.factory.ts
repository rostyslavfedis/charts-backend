import {HttpException} from "@nestjs/common";

export enum EXCEPTION_TYPE {
    SYSTEM,
}

export interface IErrorMeta {
    message: string,
    status?: any,
    type?: EXCEPTION_TYPE,
    success?: boolean
}

export const errorFactory = (args: IErrorMeta) => {

    switch (args.type) {
        case EXCEPTION_TYPE.SYSTEM:
            throw new HttpException(
                {
                    message: args.message,
                    status: args.status ? args.status : 500,
                    success: args.success
                },
                args.status ? args.status : 500
            );
        default:
            throw new HttpException(
                {
                    message: args.message,
                    status: args.status ? args.status : 500,
                    success: args.success
                },
                args.status ? args.status : 500
            );
    }
};