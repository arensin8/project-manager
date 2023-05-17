const router = require("express").Router();
const { AuthController } = require("../http/controllers/auth.controller");
const { expressValidatorMapper } = require("../http/middlewares/checkErrors");
const { registerValidator } = require("../http/validations/auth.validation");

router.post('/register' , registerValidator(), expressValidatorMapper ,AuthController.register)
module.exports = {
  AuthRoutes: router,
};