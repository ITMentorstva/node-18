
const { body } = require('express-validator');

const createJobValidation = [

    body('user_id')
        .notEmpty().withMessage('User is required')
        .isInt().withMessage('User must be a number'),

    body('company_id')
        .notEmpty().withMessage('Company is required')
        .isInt().withMessage('Company must be a number'),

    body('title')
        .notEmpty().withMessage('Title is required')
        .isLength({min: 3}).withMessage('Title must be atleast 3 characters'),

    body('salary')
        .isInt().withMessage('Salary must be a number')
        .optional({checkFalsy: true}),

    body('due_date')
        .notEmpty().withMessage('Due date is required'),

    body('technology')
        .isArray({min: 1}).withMessage('Select at least one technology'),

    body('technology.*')
        .isInt().withMessage('Tecnology must be a number'),

];


module.exports = createJobValidation;