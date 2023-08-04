import { Request, Response, NextFunction } from 'express';

import { CustomError } from '../utils/response/custom-error/CustomError';
import Logger from '../logger';


function removeStackTrace(err: CustomError) {
    if (process.env.mode === 'debug') {
        return err;
    }
    const errorResponse = err.JSON;
    delete errorResponse.stack;
    delete errorResponse.errorRaw;
    return errorResponse;
}

export const errorHandler = (err: CustomError, req: Request, res: Response, next: NextFunction) => {
    Logger.error({
        error: JSON.stringify(err.JSON),
        context: res.locals.context
    });
    console.log("ERROR HANDLING")
    if (err instanceof CustomError) {
        return res
            .status(err.HttpStatusCode)
            .json({ ...removeStackTrace(err), requestId: req.headers.zRequestId })
            ;
    }

    const internalServerError = new CustomError(500, "Raw", "Something went wrong", ["Internal server error"], err);
    return res
        .status(internalServerError.HttpStatusCode)
        .json({ ...removeStackTrace(internalServerError), requestId: req.headers.zRequestId })
        ;
    next();
};
