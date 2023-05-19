const { userModel } = require("../../model/user.model");
const { tokenVerification } = require("../../modules/functions");
const checkLogin = async (req, res, next) => {
    try {
      let authError = { status: 401, message: "please enter to your account" };
      const authorization = req?.headers?.authorization;
      if (!authorization) throw authError;
      let token = authorization.split(" ")?.[1];
      if (!token) throw authError;
      const result = tokenVerification(token);
      const { username } = result;
      const user = await userModel.findOne({ username }, { password: 0 });
      if (!user) throw authError;
      req.user = user;
      return next();
    } catch (error) {
      next(error);
    }
  };

module.exports = {
  checkLogin,
};
