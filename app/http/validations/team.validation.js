const { body , param} = require("express-validator");
const { TeamModel } = require("../../model/team.model");

function createTeamValidator(){
    return [
        body("name").isLength({min:5}).withMessage("team name should be at least 5 characters"),
        body('description').notEmpty().withMessage('description is required'),
        body('username').custom(async username => {
            const usernameRegex = /^[a-z]+[a-z0-9\.\_]{3,}$/gim;
            if(usernameRegex.test(username)){
                const team = await TeamModel.findOne({username})
                if(team) throw 'username is unavailable'
                return true
            }
            throw 'username is incorrect'
        })
    ]
}



module.exports = {
    createTeamValidator
}