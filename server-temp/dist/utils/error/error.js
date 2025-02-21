"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TooManyRequestsError = exports.RequestTimeoutError = exports.UnprocessableEntityError = exports.ConflictError = exports.UnauthorizedError = exports.NotFoundError = exports.ForbiddenError = exports.ValidationError = exports.APIError = void 0;
const status_codes_1 = require("./status-codes");
class BaseError extends Error {
    constructor(name, status, description) {
        super(description);
        this.name = name;
        this.status = status;
        this.message = description;
        Object.setPrototypeOf(this, new.target.prototype);
        Error.captureStackTrace(this);
    }
}
// 500 Internal Error
class APIError extends BaseError {
    constructor(err) {
        if (typeof err === 'string') {
            super(err, status_codes_1.STATUS_CODES.INTERNAL_ERROR, err);
            return;
        }
        let error = err.response;
        super(error.data, error.status, error.data);
    }
}
exports.APIError = APIError;
// 400 Validation Error
class ValidationError extends BaseError {
    constructor(description = 'bad request') {
        super('bad request', status_codes_1.STATUS_CODES.BAD_REQUEST, description);
    }
}
exports.ValidationError = ValidationError;
// 403 Forbidden error
class ForbiddenError extends BaseError {
    constructor(description = 'access denied') {
        console.log('HERE');
        super('access denied', status_codes_1.STATUS_CODES.FORBIDDEN, description);
    }
}
exports.ForbiddenError = ForbiddenError;
// 404 Not Found
class NotFoundError extends BaseError {
    constructor(description = 'not found') {
        super(description, status_codes_1.STATUS_CODES.NOT_FOUND, description);
    }
}
exports.NotFoundError = NotFoundError;
// 401 Unauthorized Error
class UnauthorizedError extends BaseError {
    constructor(description = 'Unauthorized access') {
        super('Unauthorized', status_codes_1.STATUS_CODES.UN_AUTHORISED, description);
    }
}
exports.UnauthorizedError = UnauthorizedError;
// 409 Conflict Error
class ConflictError extends BaseError {
    constructor(description = 'Resource conflict') {
        super('Conflict', status_codes_1.STATUS_CODES.CONFLICT, description);
    }
}
exports.ConflictError = ConflictError;
// 422 Unprocessable Entity Error
class UnprocessableEntityError extends BaseError {
    constructor(description = 'Unprocessable entity') {
        super('Unprocessable Entity', status_codes_1.STATUS_CODES.UNPROCESSABLE_ENTITY, description);
    }
}
exports.UnprocessableEntityError = UnprocessableEntityError;
// 408 Request Timeout Error
class RequestTimeoutError extends BaseError {
    constructor(description = 'Request timeout') {
        super('Request Timeout', status_codes_1.STATUS_CODES.REQUEST_TIMEOUT, description);
    }
}
exports.RequestTimeoutError = RequestTimeoutError;
// 429 Too Many Requests Error
class TooManyRequestsError extends BaseError {
    constructor(description = 'Too many requests') {
        super('Too Many Requests', status_codes_1.STATUS_CODES.TOO_MANY_REQUESTS, description);
    }
}
exports.TooManyRequestsError = TooManyRequestsError;
