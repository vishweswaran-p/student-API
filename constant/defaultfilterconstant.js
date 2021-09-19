import commonConstant from 'constant/commonconstant';

const defaultQueryParams = {

    "getAllStudents": {
        'offset':commonConstant.DEFAULT_PAGINATION_OFFSET,
        'limit':commonConstant.DEFAULT_PAGINATION_LIMIT,
        'sortFields':['id','name','createdAt','updatedAt'],
        'sortBy':'createdAt',
        'sortOrder':'ASC',
    }
};

export default defaultQueryParams;
