const { AuthRoutes } = require('./auth.router');
const { ProjectRoutes } = require("./project.router");
const { TeamRoutes } = require("./team.router");
const { UserRoutes } = require("./user.router");

const router = require("express").Router();
router.use("/auth", AuthRoutes)
router.use("/project", ProjectRoutes)
router.use("/team", TeamRoutes)
router.use("/user", UserRoutes)
module.exports = {
    AllRoutes : router
}