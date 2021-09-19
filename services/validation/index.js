/**
 * @module Validation Service
 * @author vishnu
 */

/** dependencies */
import q from 'q';
import * as error from 'middleware/errors';
import commonConstant from 'constant/commonconstant';
import defaultFilterConstant from 'constant/defaultfilterconstant';
import queryParamsValidationSchema from 'validators/queryParamsValidator';

class validationService {

    /**
     * @method validateRequestQueryParams
     * @description To validate the request query parameteres
     * @param req {Object}
     * @param type {String}
     * @returns {Object}
     */
    validateRequestQueryParams (req, type) {
        let deferred = q.defer();
        let defaultValue = defaultFilterConstant[type];
        req.checkQuery(queryParamsValidationSchema(defaultValue.sortFields));
        req.getValidationResult().then((res) => {
            if (res.isEmpty()) {
                req.query.skipPaginate = !req.query.hasOwnProperty('offset') || !req.query.hasOwnProperty('limit');
                if (req.query.offset == null || typeof req.query.offset == 'undefined' || !req.query.offset || req.query.offset < 0) {
                    req.query.offset = defaultValue.offset;
                }
                if (req.query.limit == null || typeof req.query.limit == 'undefined' || !req.query.limit || req.query.limit > commonConstant.API_CUSTOM_PARAM_MAX_LIMIT || req.query.offset < 0) {
                    req.query.limit = defaultValue.limit;
                }
                if (req.query.sortBy == null || typeof req.query.sortBy == 'undefined' || !req.query.sortBy) {
                    req.query.sortBy = defaultValue.sortBy;
                }
                if (req.query.sortOrder == null || typeof req.query.sortOrder == 'undefined' || !req.query.sortOrder) {
                    req.query.sortOrder = defaultValue.sortOrder;
                }
                if (req.query.sortOrder == null || typeof req.query.sortOrder == 'undefined' || !req.query.sortOrder) {
                    req.query.sortOrder = defaultValue.sortOrder;
                }
                deferred.resolve(req);
            } else {
                res = res.mapped();
                let errors = [];
                for(let field in res) {
                    errors.push({
                        field:field,
                        message:res[field]['msg'] || 'Invalid field'
                    })
                }
                throw new error.validationError({message:errors});
            }
        })
        .catch(err => {
            deferred.reject(err);
        });
        return deferred.promise;
    }

    /**
     * @method validateRequestParams
     * @description To validate the request uri parameteres
     * @param req {Object}
     * @param schema {Object}
     * @returns {Object}
     */
    validateRequestParams(req, schema) {
        let deferred = q.defer();
        req.checkParams(schema);
        req.getValidationResult().then((res) => {
            if (res.isEmpty()) {
                deferred.resolve(req);
            } else {
                res = res.mapped();
                let errors = [];
                for(let field in res) {
                    errors.push({
                        field:field,
                        message:res[field]['msg'] || 'Invalid field'
                    })
                }
                throw new error.validationError({message:errors});
            }
        })
        .catch(err => {
            deferred.reject(err);
        });
        return deferred.promise;
    }

}

export default new validationService();
