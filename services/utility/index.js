/**
 * @module services/utility
 * @file This file has supportive utility methods
 */

/** dependencies */
import _ from 'lodash';
import errorConstant from 'constant/errorconstant';
import commonConstant from 'constant/commonconstant';
import apiResponseConstant from 'constant/apiresponseconstant';

/**
 * @class utilityService
 * @description This class has the utility methods for the API
 */
class utilityService {

     /**
      * @method buildResponse
      * @description To build response object with failure status type
      * @param api_response_code {String}
      * @param optional_msg {String}
      * @param setOptionalMsgOnly {Boolean}
      * @returns {Object} response
      */
    buildResponse (api_response_code,optional_msg='',setOptionalMsgOnly = false) {
        let message;
        if(!setOptionalMsgOnly) {
            message = errorConstant[api_response_code] // +' '+optional_msg;
        } else {
            message = optional_msg;
        }
         return {
            code: api_response_code,
            status: commonConstant.RESPONSE_TYPE_FAILURE,
            message: message
        };
    }

    /**
     * @method isApplicationError
     * @description Check error type is Application error or Custom error
     * @param error {Object}
     * @returns {boolean}
     */
    isApplicationError(error) {
        return error instanceof Error;
    }

    /**
     * @method getFileEmptyValidationMessage
     * @description Response generator for empty file upload
     * @param field_name
     * @returns {{code: string, errors: {field: *, message: string}[], status: string}}
     */
    getFileEmptyValidationMessage(field_name) {
        return {
            code:apiResponseConstant.VALIDATION_ERROR,
            status:commonConstant.RESPONSE_TYPE_FAILURE,
            errors:[{
                field:field_name,
                message:'File field is empty.'
            }]
        }
    }

    /**
     * @method validateStudentArray
     * @description To validate the records in uploaded file
     * @param {Object} [rows]
     * @returns {Object}
     */
    validateStudentArray(rows) {
        let response = {isValid: false, valid: [], invalid: []};
        let validKeys = ['Name', 'Age', 'Mark 1', 'Mark 2', 'Mark 3'];
        for(let i=0; i<rows.length; i++) {
            let student = rows[i];
            let studentKeys = Object.keys(rows[i]);
            if(_.isEqual(validKeys, studentKeys)) {
                if(student['Name'] != null && student['Name'].length !== 0 && student['Age'] != null && parseInt(student['Age']) !== 0 &&
                   student['Mark 1'] != null && student['Mark 2'] != null && student['Mark 3'] != null) {
                    response.valid.push(student);
                } else {
                    response.invalid.push(student);
                }
            } else {
                response.invalid.push(student);
            }
        }
        response.isValid = (response.valid.length !== 0);
        return response;
    }
}

export default new utilityService();
