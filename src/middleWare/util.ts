import Logger from "../logger";
import { v4 } from "uuid";
import { Response, Request } from "express";


function assignRequestId(req: Request, res: Response, next: any) {
    req.headers.zRequestId = v4();
    next();
}

export default {
    assignRequestId,
};