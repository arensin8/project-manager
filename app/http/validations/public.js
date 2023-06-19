const { param } = require("express-validator");

function mongoIdValidator(){
    return[
        param("_id").isMongoId().withMessage("id is not correct")
    ]
}

module.exports ={
    mongoIdValidator
}