export default function queryParamsValidationSchema(sort_fields) {

    let sortFieldRegex = new RegExp('\\b(?:' + sort_fields.join('|') + ')\\b','g');

    return {
        'offset':{
            notEmpty:false,
            optional:true,
            isNumeric:true,
            errorMessage:'Page offset must be numeric and not empty'
        },
        'limit':{
            notEmpty:false,
            optional:true,
            isNumeric:true,
            errorMessage:'Page limit must be numeric and not empty'
        },
        'sortOrder':{
            notEmpty:false,
            optional:true,
            matches: {
                options: [/\b(?:ASC|DESC)\b/],
                errorMessage: "Sort order field is invalid"
            },
            errorMessage:'Sort order must not be empty'
        },
        'sortBy':{
            notEmpty:false,
            optional:true,
            matches: {
                options: sortFieldRegex,
                errorMessage: "Sort by field is invalid"
            },
            errorMessage:'Sort by field cannot be empty'
        },
        'searchText':{
            notEmpty:false,
            optional:true,
            errorMessage:'Search text must not be empty'
        },
        'isActive':{
            notEmpty:true,
            optional:true,
            matches: {
                options: [/\b(?:0|1)\b/],
                errorMessage: "isActive field is invalid"
            },
            errorMessage:'isActive must not be empty'
        },
        'studentId': {
            notEmpty: true,
            optional: true,
            errorMessage: 'Student identifier must not be empty.'
        },
    }
}
