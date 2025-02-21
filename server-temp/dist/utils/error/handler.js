"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HandleUnCaughtException = exports.HandleErrorWithLogger = void 0;
const error_1 = require("./error");
const logger_1 = require("../logger");
const zod_1 = require("zod");
const HandleErrorWithLogger = (error, req, res, next) => {
    console.log('ERROR HERE');
    console.log(error);
    let reportError = true;
    let status = 500;
    let data = error.message;
    // skipping common/known errors
    [
        error_1.NotFoundError,
        error_1.ValidationError,
        error_1.ForbiddenError,
        error_1.APIError,
        error_1.UnauthorizedError,
        error_1.ConflictError,
        error_1.UnprocessableEntityError,
        error_1.RequestTimeoutError,
        error_1.TooManyRequestsError,
    ].forEach((typeOfError) => {
        if (error instanceof typeOfError) {
            status = error.status;
            data = error.message;
        }
    });
    // Validation(Zod) Error's
    if (error instanceof zod_1.ZodError) {
        const formattedErrors = error.errors.map((e) => ({
            field: e.path.join('.'),
            error: e.message,
        }));
        return res.status(400).json({ error: formattedErrors });
    }
    if (reportError) {
        // error reporting tools implementation eg: Cloudwatch,Sentry etc;
        logger_1.logger.error('error');
    }
    else {
        logger_1.logger.warn('warm'); // ignore common errors caused by user
    }
    return res.status(status).json({ error: data });
};
exports.HandleErrorWithLogger = HandleErrorWithLogger;
const HandleUnCaughtException = (error) => __awaiter(void 0, void 0, void 0, function* () {
    logger_1.logger.error(error);
    process.exit(1);
});
exports.HandleUnCaughtException = HandleUnCaughtException;
