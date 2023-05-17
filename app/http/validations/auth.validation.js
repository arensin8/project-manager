const {body} = require("express-validator")
const { userModel } = require("../../model/user.model")

function registerValidator(){
    return [
        body("username").custom(async (value, ctx) => {
            if(value){
                const usernameRegex = /^[a-z]+[a-z0-9\_\.]{2,}/gi
                if(usernameRegex.test(value)){
                    const user = await userModel.findOne({username : value})
                    if(user) throw "username already exists, please enter another one"
                    return true
                }
                throw "username is incorrect"
            }else{
                throw "username is required"
            }
        }),
        body("email").isEmail().withMessage("email is incorrect")
        .custom(async email => {
            const user = await userModel.findOne({email})
            if(user) throw "email already exists";
            return true;
        }),
        body("mobile").isMobilePhone("am-AM").withMessage("mobile number is incorrect")
        .custom(async mobile => {
            const user = await userModel.findOne({mobile})
            if(user) throw "mobile alredy exits";
            return true;
        }),
        body("password").custom((value, ctx) => {
            if(!value) throw "password is required";
            if(value !== ctx?.req?.body?.confirmed_password) throw "passwords do not match";
            return true
        })
    ]
}

module.exports ={
    registerValidator
}