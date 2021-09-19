/** Dependencies */
import log from 'services/log';
import erroMessages from 'constant/errorconstant';
import commonConstant from 'constant/commonconstant';
import responseConstant from 'constant/responseconstant';
import apiResponseConstant from 'constant/apiresponseconstant';

class apiResponses {

    /**
     * sends a "Bad Request" header to user
     * @param res {Object} response obj
     * @param err {Object} optional error message
     */
    sendServerError(res, err) {
        log.warn('Server Error.', err);
        res.status(responseConstant.HTTP_INTERNAL_SERVER_ERROR).json({
            code:apiResponseConstant.UNKNOWN_ERROR_OCCURRED,
            status:commonConstant.RESPONSE_TYPE_FAILURE,
            message:err ? err.toString() : null
        });
    };

    /**
     * sends a "Bad Request" header to user
     * @param res {Object} response obj
     * @param err {Object} optional error message
     */
    sendBadRequest(res, err) {
        log.warn('Bad request made.', err);
        res.status(responseConstant.HTTP_BAD_REQUEST).json({
            code:apiResponseConstant.BAD_REQUEST,
            status:commonConstant.RESPONSE_TYPE_FAILURE,
            message:err ? err.toString() : null
        });
    };

    /**
     * sends a "validation error" header to user
     * @param res {Object} response obj
     * @param err {Object} optional error message
     */
    sendValidationError(res, err) {
        log.warn('Validation Error.', err);
        res.status(responseConstant.HTTP_UNPROCESSABLE_ENTITY).json({
            code:apiResponseConstant.VALIDATION_ERROR,
            status:commonConstant.RESPONSE_TYPE_FAILURE,
            errors: err ? err : 'Validation error.'
        });
    }

    /**
     * sends a "Resource Not Found" header to user
     * @param res {Object} response obj
     * @param err {Object} optional error message
     */
    sendUnauthorizedRequest(res, err) {
        log.warn('Unauthorized request made.', err);
        res.status(responseConstant.HTTP_UNAUTHORIZED).json({
            code:apiResponseConstant.INVALID_TOKEN,
            status:commonConstant.RESPONSE_TYPE_FAILURE,
            message: err ? err : null
        });
    };

    /**
     * sends a "Resource Not Found" header to user
     * @param res {Object} response obj
     * @param err {Object} optional error message
     */
    sendResourceNotFound(res, err) {
        log.warn('Resource not found.', err);
        res.status(responseConstant.HTTP_NOT_FOUND).json({
            code:apiResponseConstant.RESOURCE_NOT_FOUND,
            status:commonConstant.RESPONSE_TYPE_FAILURE,
            message:err ? err.toString() : null
        });
    };

    /**
     * sends a "Resource Not Found" header to user
     * @param res {Object} response obj
     * @param err {Object} optional error message
     */
    sendResourceLocked(res, err) {
        log.warn('Resource locked.', err);
        res.status(responseConstant.HTTP_RESOURCE_LOCKED).end(err ? err.toString() : null);
    };

    /**
     * sends a "Resource or action forbidden" header to user
     * @param res {Object} response obj
     * @param err {Object} optional error message
     */
    sendForbiddenResponse(res, err) {
        log.warn('Action forbidden.', err);
        res.status(responseConstant.HTTP_FORBIDDEN).end(err ? err.toString() : null);
    };

    /**
     * sends a "Resource not modified" header to user
     * @param res {Object} response obj
     * @param data {Object} data to send
     */
    sendResourceNotModified(res, data) {
        log.warn('Resource not modified.', data);
        res.status(responseConstant.HTTP_NOT_MODIFIED).end();
    };


    /**
     * sends a error header to user
     * @param res {Object} response obj
     * @param errCode {Object} optional error message
     */
    sendErrorResponse(res, errCode) {
        log.warn('An error occurred on the server.', errCode);
        res.status(erroMessages[errCode]).json({
            code: errCode,
            status: commonConstant.RESPONSE_TYPE_FAILURE,
            message: erroMessages.errorMessage[errCode]
        });
    };

    /**
     * sends a straight response back to the client with an optional payload
     * @param res {Object} response obj
     * @param  payload {Object}
     */
    sendOwnResponse(res, payload) {
        let response = {
            code: apiResponseConstant.SUCCESS,
            status: commonConstant.RESPONSE_TYPE_SUCCESS
        };
        if (payload !== null) {
            if (typeof payload === 'number') {
                // log.debug('Sending integer response.', payload);
                response.data = payload.toString();
            } else if (typeof payload === 'boolean') {
                // log.debug('Sending boolean response.', payload);
                response.data = payload;
            } else if (typeof payload === 'object') {
                if (payload.status && payload.code) {
                    response = payload;
                } else {
                    if (payload.fieldSet) {
                        response.status = commonConstant.RESPONSE_TYPE_FAILURE;
                        response.code = apiResponseConstant['INVALID_CREDENTIALS'];
                    }
                    response.data = payload;
                }
            } else {
                // log.debug('Sending non-json response.', payload);
                response.data = payload;
            }
        }
        return res.json(response);

    }
}

export default new apiResponses();
