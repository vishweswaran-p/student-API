/**
 * @module controller/student
 * @file This file is the controller for student related operations
 * @author vishnu
 */

/** dependencies */
import q from 'q';
import fs from 'fs';
import parse from 'csv-parse';
import logger from 'services/log';
import utility from 'services/utility';
import studentModel from 'model/student';
import * as error from 'middleware/errors';
import apiResponseConstant from 'constant/apiresponseconstant';


/**
 * @class studentController
 * @description This class has controller methods for Student related operations
 */
class studentController {

    /**
     * @method getStudents
     * @description Function to get list of Students
     * @param {Object} filterOptions
     * @returns {Object} [Students]
     */
    getStudents(filterOptions) {
        let deferred = q.defer();
        let Student = studentModel.getConnectionVar();
        let whereCondition = {};
        if(filterOptions.hasOwnProperty('resultStatus') && filterOptions['resultStatus'].length !== 0) {
            whereCondition = studentModel.getWhereCondition(filterOptions);
        }
        Student.findAll({
            where: whereCondition,
            offset: filterOptions.offset,
            limit: filterOptions.limit,
            order: [
                [filterOptions.sortBy, filterOptions.sortOrder]
            ],
        })
        .then(result => {
            deferred.resolve(result != null ? result : {});
        })
        .catch(err => {
            if (utility.isApplicationError(err)) {
                logger.error('studentController::getStudents',err);
                deferred.reject(utility.buildResponse(apiResponseConstant.UNKNOWN_ERROR_OCCURRED));
            } else {
                deferred.reject(err);
            }
        });
        return deferred.promise;
    }

    /**
     * @method getStudent
     * @description Function to get a Student record
     * @param {Number} studentId
     * @returns {Object} Student
     */
    getStudent(studentId) {
        let deferred = q.defer();
        let Student = studentModel.getConnectionVar();
        Student.findByPk(studentId).then(result => {
            deferred.resolve(result != null ? result : {});
        })
        .catch(err => {
            if (utility.isApplicationError(err)) {
                logger.error('studentController::getStudent',err);
                deferred.reject(utility.buildResponse(apiResponseConstant.UNKNOWN_ERROR_OCCURRED));
            } else {
                deferred.reject(err);
            }
        });
        return deferred.promise;
    }

    /**
     * @method createStudents
     * @description Function to create Student records
     * @param {Object} file
     * @returns {Object} [Student]
     */
    createStudents(file) {
        let deferred = q.defer();
        fs.readFile(file.path, (err, fileData) => {
            parse(fileData, {columns: true, trim: true}, (err, rows) => {
                if(rows.length === 0) {
                    deferred.reject(new error.validationError({message:"File is empty."}));
                } else {
                    let validationResponse = utility.validateStudentArray(rows);
                    if(validationResponse.isValid) {
                        let Students = [];
                        for (let i=0 ; i<validationResponse.valid.length; i++) {
                            Students.push({
                                'name': validationResponse.valid[i]['Name'],
                                'age': parseInt(validationResponse.valid[i]['Age']),
                                'mark1': parseInt(validationResponse.valid[i]['Mark 1']),
                                'mark2': parseInt(validationResponse.valid[i]['Mark 2']),
                                'mark3': parseInt(validationResponse.valid[i]['Mark 3'])
                            })
                        }
                        let Student = studentModel.getConnectionVar();
                        Student.bulkCreate(Students).then(result => {
                            deferred.resolve(validationResponse);
                        })
                        .catch(err => {
                            if (utility.isApplicationError(err)) {
                                logger.error('studentController::createStudents',err);
                                deferred.reject(utility.buildResponse(apiResponseConstant.UNKNOWN_ERROR_OCCURRED));
                            } else {
                                deferred.reject(err);
                            }
                        });
                    } else {
                        deferred.resolve(validationResponse);
                    }
                }
            })
        });
        return deferred.promise;
    }
}

export default new studentController();
