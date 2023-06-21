const { TeamController } = require("../http/controllers/team.controller");
const { expressValidatorMapper } = require("../http/middlewares/checkErrors");
const { checkLogin } = require("../http/middlewares/checkLogin");
const { createTeamValidator } = require("../http/validations/team.validation");

const router = require("express").Router();
router.post('/create' , checkLogin ,createTeamValidator(), expressValidatorMapper, TeamController.createTeam)

module.exports = {
  TeamRoutes: router,
};
