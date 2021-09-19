import responseConstant from 'constant/responseconstant';
import apiResponseConstant from 'constant/apiresponseconstant';

const errorMessage  = {};

errorMessage[responseConstant.HTTP_UNAUTHORIZED] = "Unauthorized access";
errorMessage[responseConstant.HTTP_FORBIDDEN] = "Unauthorized access";
errorMessage[responseConstant.HTTP_NOT_IMPLEMENTED] = "Invalid request";
errorMessage[responseConstant.HTTP_NOT_FOUND] = "Page not found";
errorMessage[responseConstant.HTTP_METHOD_NOT_ALLOWED] = "Method not allowed";

errorMessage[apiResponseConstant.BAD_REQUEST] = 'Bad request';
errorMessage[apiResponseConstant.RESOURCE_NOT_FOUND] = "Resource not found";
errorMessage[apiResponseConstant.UNKNOWN_ERROR_OCCURRED] = "Unable to process the request";
errorMessage[apiResponseConstant.INVALID_TOKEN] = "Your session has been expired.";
errorMessage[apiResponseConstant.INVALID_CREDENTIALS] = "Invalid credentials";
errorMessage[apiResponseConstant.FILE_TOO_LARGE] = 'Please upload file of size less than 5 MB.';
errorMessage[apiResponseConstant.FILE_UNSUPPORTED_TYPE] = 'File format not supported.';
errorMessage[apiResponseConstant.FILE_NOT_FOUND] = 'File not found for given file identifier.';

export default errorMessage;

