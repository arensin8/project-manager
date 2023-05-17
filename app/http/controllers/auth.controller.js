const { hashString } = require("../../modules/functions");
const { userModel } = require("../../model/user.model");

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
  login() {}
  resetpassword() {}
}

module.exports = {
  AuthController: new AuthController(),
};
