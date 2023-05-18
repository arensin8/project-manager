const { hashString, tokenGenerator } = require("../../modules/functions");
const { userModel } = require("../../model/user.model");
const bcrypt = require('bcrypt')

class AuthController {
  async register(req, res, next) {
    try {
      const { username, password, email, mobile } = req.body;
      const hashPassword = hashString(password);
      const user = await userModel
        .create({
          username,
          email,
          mobile,
          password: hashPassword,
        })
        .catch((err) => {
          if (err?.code == 11000) {
            throw { status: 400, message: "username already exists from past" };
          }
        });
        return res.json(user);
    } catch (error) {
      next(error);
    }
  }
  async login(req,res,next) {
    const {username , password} = req.body;
    const user = await userModel.findOne({username});
    if(!user) throw {status : 401 , message : "username or password is incorrect"}
    const compareResult = bcrypt.compareSync(password , user.password);
    const token = tokenGenerator({username});
    user.token = token;
    user.save();
    if(!compareResult) throw {status : 401 , message : "username or password is incorrect"}
    return res.status(200).json({
        status : 200,
        success : true,
        message : "login successfully",
        token 
    })
  }
  resetpassword() {}
}

module.exports = {
  AuthController: new AuthController(),
};
