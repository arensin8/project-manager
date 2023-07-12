const { TeamController } = require("../http/controllers/team.controller");
const { expressValidatorMapper } = require("../http/middlewares/checkErrors");
const { checkLogin } = require("../http/middlewares/checkLogin");
const { mongoIdValidator } = require("../http/validations/public");
const { createTeamValidator } = require("../http/validations/team.validation");

const router = require("express").Router();
router.post('/create' , checkLogin ,createTeamValidator(), TeamController.createTeam)
router.get('/list' , checkLogin , TeamController.getListOfTeams)
router.get('/me' , checkLogin , TeamController.getMyTeams)
router.get("/invite/:teamID/:username", checkLogin, TeamController.inviteUserToTeam)
router.get('/:id' , checkLogin ,mongoIdValidator(), expressValidatorMapper, TeamController.getTeamById)
router.delete('/remove/:id' , checkLogin ,mongoIdValidator(), expressValidatorMapper, TeamController.removeTeamById)


module.exports = {
  TeamRoutes: router,
};
