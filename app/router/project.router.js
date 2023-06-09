const { ProjectController } = require("../http/controllers/project.controller");
const { checkLogin } = require("../http/middlewares/checkLogin");
const { expressValidatorMapper } = require("../http/middlewares/checkErrors");
const { createProjectValidator } = require("../http/validations/project.validation");
const { uploadFile } = require("../modules/express-fileupload");
const fileUpload = require('express-fileupload');
const { mongoIdValidator } = require("../http/validations/public");

const router = require("express").Router();
router.post("/create",fileUpload(), uploadFile,createProjectValidator(),expressValidatorMapper,checkLogin, ProjectController.createProject)
router.get("/list",checkLogin, ProjectController.getAllPRojects)
router.get("/:id",checkLogin , mongoIdValidator(),expressValidatorMapper,  ProjectController.getProjectById.bind(ProjectController))
router.delete("/remove/:id",checkLogin, mongoIdValidator(), expressValidatorMapper, ProjectController.removeProject)
router.put("/edit/:id",checkLogin,mongoIdValidator(), expressValidatorMapper, ProjectController.updateProject)
router.patch("/edit-projectImage/:id",fileUpload(),checkLogin, uploadFile ,mongoIdValidator(), expressValidatorMapper, ProjectController.updateProjectImage)

module.exports = {
    ProjectRoutes : router
}