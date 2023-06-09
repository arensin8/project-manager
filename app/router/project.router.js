const { ProjectController } = require("../http/controllers/project.controller");
const { checkLogin } = require("../http/middlewares/checkLogin");
const { expressValidatorMapper } = require("../http/middlewares/checkErrors");
const { createProjectValidator } = require("../http/validations/project.validation");
const { uploadFile } = require("../modules/express-fileupload");
const fileUpload = require('express-fileupload');

const router = require("express").Router();

router.post("/create",fileUpload(), uploadFile,createProjectValidator(),expressValidatorMapper,checkLogin, ProjectController.createProject)

module.exports = {
    ProjectRoutes : router
}