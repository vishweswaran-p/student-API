/**
 * @module router/student
 * @file This file has the endpoints for student related operations
 * @author vishnu
 */

/** dependencies */
import path from 'path';
import multer from 'multer';
import utility from 'services/utility';
import validationService from 'services/validation';
import * as errors from 'middleware/errors';
import studentController from 'controller/student';
import commonConstant from 'constant/commonconstant';
import apiResponseConstant from 'constant/apiresponseconstant';
import * as studentValidators from 'validators/studentValidators';

let baseDir = process.cwd();

let storage = multer.diskStorage({
    destination:  (req, file, cb) => {
        cb(null, baseDir+ commonConstant.FILE_UPLOAD_FOLDER_PATH)
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + new Date().getTime()+path.extname(file.originalname))
    }
});

let upload = multer({
    storage: storage,
    limits: {
        fileSize: commonConstant.FILE_UPLOAD_MAX_SIZE
    },
    fileFilter:  (req, file, callback) => {
        let ext = path.extname(file.originalname);
        if(!commonConstant.FILE_UPLOAD_SUPPORTED_TYPES.includes(ext)) {
            let error = {
                msg:'FILE_TYPE'
            };
            return callback(error);
        }
        callback(null, true);
    }
}).single('file');

/**
 * @class studentRouter
 * @description This class has router middlewares for student related operations
 */
class studentRouter {

    getStudents(req, res) {
        validationService.validateRequestQueryParams(req, "getAllStudents").then(result => {
            return studentController.getStudents(req.query);
        })
        .then(res.$end)
        .catch(res.$end)
    }

    getStudent(req, res) {
        validationService.validateRequestParams(req, studentValidators.studentIdentifier).then(result => {
            return studentController.getStudent(req.params.student_id);
        })
        .then(res.$end)
        .catch(res.$end)
    }

    createStudents(req, res) {
        upload(req, res,  (err) => {
            if (err) {
                if(err.code === 'LIMIT_FILE_SIZE') {
                    res.$end(utility.buildResponse(apiResponseConstant.FILE_TOO_LARGE));
                } else if (err.msg === 'FILE_TYPE') {
                    res.$end(utility.buildResponse(apiResponseConstant.FILE_UNSUPPORTED_TYPE));
                } else {
                    res.$end(new errors.ServerError(apiResponseConstant.UNKNOWN_ERROR_OCCURRED));
                }
            } else {
                if(!req.file || req.file === undefined) {
                    res.$end(utility.getFileEmptyValidationMessage('file'));
                } else {
                    studentController.createStudents(req.file)
                    .then(res.$end)
                    .catch(res.$end)
                }
            }
        })
    }
}

export default new studentRouter();
