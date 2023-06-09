const { body } = require("express-validator");

function createProjectValidator(){
    return [
        body('title').notEmpty().withMessage("Projects title cant be empty"),
        body('text').notEmpty().isLength({min:20}).withMessage('Project text should be at least 20 characters and cant be empty'),
        body('tags').isArray({min:0,max:10}).withMessage('Max 10 tags is aloowed')
    ]
}

module.exports= {
    createProjectValidator
}