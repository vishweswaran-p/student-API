const CommonConstant = {

    RESPONSE_TYPE_SUCCESS:'success',
    RESPONSE_TYPE_FAILURE:'failure',

    DEFAULT_PAGINATION_OFFSET:0,
    DEFAULT_PAGINATION_LIMIT:10,

    // File upload related configurations
    FILE_UPLOAD_FOLDER_PATH:'/uploads',
    FILE_UPLOAD_MAX_SIZE: 5 * 1024 * 1024, // 5 MB (in Bytes)
    FILE_UPLOAD_SUPPORTED_TYPES: ['.csv'],

    //DATABASE TABLE NAMES
    STUDENT_TABLE_NAME: 'students',

    PASS_MARK: 35,
};

export default CommonConstant;
