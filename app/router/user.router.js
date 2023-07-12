
const userController = require("../http/controllers/user.controller");
const { UserController } = require("../http/controllers/user.controller");
const { expressValidatorMapper } = require("../http/middlewares/checkErrors");
const { checkLogin } = require("../http/middlewares/checkLogin");
const { imageValidator } = require("../http/validations/user.validation");
const { uploadMulter } = require("../modules/multer");

const router = require("express").Router();
router.get("/profile", checkLogin, UserController.getProfile)
router.post("/profile", checkLogin, UserController.editProfile)
router.post("/upload-image", checkLogin,  uploadMulter.single("image") , imageValidator(), expressValidatorMapper ,UserController.uploadProfileImage)
router.get('/requests' , checkLogin , UserController.getAllRequests)
router.get('/requests/:status' , checkLogin , UserController.getRequestsByStatus)

module.exports = {
  UserRoutes : router
}

module.exports = {
  UserRoutes: router,
};
