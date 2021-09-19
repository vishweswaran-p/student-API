/** Dependencies */
import errorConstant from 'constant/errorconstant';
import responseConstant from'constant/responseconstant';

/**
 * error; signifies a bad HTTP request from a client
 * @param message {*} error object or descriptive error message
 * @returns {BadRequestError}
 * @constructor
 */
let BadRequestError = function(message) {
  if (!(this instanceof BadRequestError)) {
    return new BadRequestError(message);
  }

  if (message && message.message) {
    this.message = message.message;
  } else if (message) {
    this.message = errorConstant[message];
  } else {
    this.message = 'Bad request made.';
  }

  this.status = responseConstant.HTTP_BAD_REQUEST;
  return this;
};

/**
 * error; signifies an unauthorized HTTP request from a client
 * @param message {*} error object or descriptive error message
 * @returns {PermissionDeniedError}
 * @constructor
 */
let PermissionDeniedError = function(message) {
  if (!(this instanceof PermissionDeniedError)) {
    return new PermissionDeniedError(message);
  }

  if (message && message.message) {
    this.message = message.message;
  } else if (message) {
    this.message = errorConstant[message];
  } else {
    this.message = 'Permission denied.';
  }

  this.status = responseConstant.HTTP_UNAUTHORIZED;
  return this;
};

/**
 * error; signifies the server couldn't find the requested object from a client
 * @param message {*} error object or descriptive error message
 * @returns {ResourceNotFoundError}
 * @constructor
 */
let ResourceNotFoundError = function(message) {
  if (!(this instanceof ResourceNotFoundError)) {
    return new ResourceNotFoundError(message);
  }

  if (message && message.message) {
    this.message = message.message;
  } else if (message) {
    this.message = errorConstant[message];
  } else {
    this.message = 'Resource not found.';
  }

  this.status = responseConstant.HTTP_NOT_FOUND;
  return this;
};

/**
 * error; signifies the resource is currently locked
 * @param message {*} error object or descriptive error message
 * @returns {ResourceLockedError}
 * @constructor
 */
let ResourceLockedError = function(message) {
  if (!(this instanceof ResourceLockedError)) {
    return new ResourceLockedError(message);
  }

  if (message && message.message) {
    this.message = message.message;
  } else if (message) {
    this.message = errorConstant[message];
  } else {
    this.message = 'Resource locked.';
  }

  this.status = responseConstant.HTTP_RESOURCE_LOCKED;
  return this;
};

/**
 * error; signifies the resource or action is forbidden
 * @param message {*} error object or descriptive error message
 * @returns {ForbiddenError}
 * @constructor
 */
let ForbiddenError = function(message) {
  if (!(this instanceof ForbiddenError)) {
    return new ForbiddenError(message);
  }

  if (message && message.message) {
    this.message = message.message;
  } else if (message) {
    this.message = errorConstant[message];
  } else {
    this.message = 'Resource forbidden.';
  }

  this.status = responseConstant.HTTP_FORBIDDEN;
  return this;
};

/**
 * error; signifies the resource has not been modified
 * @param message {*} error object or descriptive error message
 * @returns {ResourceNotModifiedError}
 * @constructor
 */
let ResourceNotModifiedError = function(message) {
  if (!(this instanceof ResourceNotModifiedError)) {
    return new ResourceNotModifiedError(message);
  }

  if (message && message.message) {
    this.message = message.message;
  } else if (message) {
    this.message = this.data = errorConstant[message];
  } else {
    this.message = 'Resource not modified.';
  }

  this.status = responseConstant.HTTP_NOT_MODIFIED;
  return this;
};

/**
 * error; signifies the server couldn't encountered an error while responding to the client
 * @param message {*} error object or descriptive error message
 * @returns {ServerError}
 * @constructor
 */
let ServerError = function(message) {
  if (!(this instanceof ServerError)) {
    return new ServerError(message);
  }

  if (message && message.message) {
    this.message = message.message;
  } else if (message) {
    this.message = errorConstant[message];
  } else {
    this.message = 'Server error occurred.';
  }

  this.status = responseConstant.HTTP_INTERNAL_SERVER_ERROR;
  return this;
};

/**
 * error; signifies the validation error while responding to the client
 * @param message {*} error object or descriptive error message
 * @returns {validationError}
 * @constructor
 */
let validationError = function(message) {
  if (!(this instanceof validationError)) {
    return new validationError(message);
  }

  if (message && message.message) {
    this.message = message.message;
  } else if (message) {
    this.message = errorConstant[message];
  } else {
    this.message = 'Validation error occurred.';
  }

  this.status = responseConstant.HTTP_UNPROCESSABLE_ENTITY;
  return this;
};

/**
 * error; signifies that too many requests are raised in a period of time
 * @param message {*} error object or descriptive error message
 * @returns {tooManyRequestsError}
 * @constructor
 */
let tooManyRequestsError = function(message) {
  if (!(this instanceof tooManyRequestsError)) {
    return new tooManyRequestsError(message);
  }

  if (message && message.message) {
    this.message = message.message;
  } else if (message) {
    this.message = message;
  } else {
    this.message = 'Too many accounts created from this IP, please try after some time.';
  }

  this.status = responseConstant.HTTP_UNPROCESSABLE_ENTITY;
  return this;
};

/**
 * override of the `toString() function, sends back a descriptive error message
 * @type {String}
 */
BadRequestError.toString =
    PermissionDeniedError.toString =
        ResourceNotFoundError.toString =
            ResourceLockedError.toString =
                ForbiddenError.toString =
                    ResourceNotModifiedError.toString =
                        ServerError.toString =
                            validationError.toString =
                                tooManyRequestsError.toString = function() {
                                  return this.message;
                                };
exports.BadRequestError = BadRequestError;
exports.PermissionDeniedError = PermissionDeniedError;
exports.ResourceNotFoundError = ResourceNotFoundError;
exports.ResourceLockedError = ResourceLockedError;
exports.ForbiddenError = ForbiddenError;
exports.ResourceNotModifiedError = ResourceNotModifiedError;
exports.ServerError = ServerError;
exports.validationError = validationError;
exports.tooManyRequestsError = tooManyRequestsError;
