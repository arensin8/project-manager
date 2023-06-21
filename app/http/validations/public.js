const { param } = require("express-validator");

function mongoIdValidator(){
    return[
        param("id").isMongoId().withMessage("id is not correct")
    ]
}

module.exports ={
    mongoIdValidator
}