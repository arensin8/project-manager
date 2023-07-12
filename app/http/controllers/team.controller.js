const autoBind = require("auto-bind");
const { TeamModel } = require("../../model/team.model");
const { userModel } = require("../../model/user.model");

class TeamController {
  constructor(){
    autoBind(this)
  }
  async createTeam(req, res, next) {
    try {
      const { name, username, description } = req.body;
      const owner = req.user._id;
      const team = await TeamModel.create({
        name,
        description,
        username,
        owner,
      });
      if (!team) throw { status: 500, message: "team isnt created" };
      return res.status(201).json({
        status: 201,
        success: true,
        message: "team created successfully",
      });
    } catch (error) {
      next(error);
    }
  }
  async getListOfTeams(req, res, next) {
    try {
      const teams = await TeamModel.find({});
      return res.status(200).json({
        status: 200,
        success: true,
        teams,
      });
    } catch (error) {
      next(error);
    }
  }
  async getTeamById(req, res, next) {
    try {
      const teamId = req.params.id;
      const team = await TeamModel.findById(teamId);
      if (!team) throw { status: 400, message: "team not found" };
      return res.status(200).json({
        status: 200,
        success: true,
        team,
      });
    } catch (error) {
      next(error);
    }
  }
  async getMyTeams(req, res, next) {
    try {
      const userId = req.user._id;
      const teams = await TeamModel.find({
        $or: [{ owner: userId }, { users: userId }],
      });
      return res.status(200).json({
        status: 200,
        success: true,
        teams,
      });
    } catch (error) {
      next(error);
    }
  }
  async findUserInTeam(teamID, userID) {
    const result = await TeamModel.findOne({
      $or: [{ owner: userID }, { users: userID }],
      _id: teamID,
    });
    return !!result;
  }
  //http:anything.com/team/invite/:teamID/:username
  async inviteUserToTeam(req, res, next) {
    try {
      const userID = req.user._id;
      const { username, teamID } = req.params;
      const team = await this.findUserInTeam(teamID, userID);
      if (!team)
        throw { status: 400, message:"not found team for invitation" };
      const user = await userModel.findOne({ username });
      if (!user)
        throw {
          status: 400,
          message: "user for inviting to team isnt found",
        };
      const userInvited = await this.findUserInTeam(teamID, user._id);
      if (userInvited)
        throw {
          status: 400,
          message: "the user already added to team in the past",
        };
      const request = {
        caller: req.user.username,
        requestDate: new Date(),
        teamID,
        status: "pending",
      };
      const updateUserResult = await userModel.updateOne(
        { username },
        {
          $push: { inviteRequests: request },
        }
      );
      if (updateUserResult.modifiedCount == 0)
        throw { status: 500, message: "the invitation request isnt approved" };
      return res.status(200).json({
        status: 200,
        success: true,
        message: "your request is approved",
      });
    } catch (error) {
      next(error);
    }
  }
  async removeTeamById(req, res, next) {
    try {
      const teamId = req.params.id;
      const team = await TeamModel.findById(teamId);
      if (!team) throw { status: 400, message: "team not found" };
      const result = await TeamModel.deleteOne({ _id: teamId });
      if (result.deletedCount == 0)
        throw { status: 404, message: "team isnt deleted" };
      return res.status(200).json({
        status: 200,
        success: true,
        message: "team deleted successfully",
      });
    } catch (error) {
      next(error);
    }
  }
  updateTeam() {}
}

module.exports = {
  TeamController: new TeamController(),
};
