const { TeamModel } = require("../../model/team.model");

class TeamController {
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
    async getTeamById(req,res,next){
        try {
            const teamId = req.params.id;
            const team = await TeamModel.findById(teamId);
            if(!team) throw {status:400,message:'team not found'}
            return res.status(200).json({
                status:200,
                success:true,
                team
            })
        } catch (error) {
            next(error)
        }
    }
    async getMyTeams(req,res,next){
        try {
            const userId = req.user._id;
            const teams = await TeamModel.find({
                $or: [
                    {owner : userId},
                    {users : userId}
                ]
            })
            return res.status(200).json({
                status:200,
                success:true,
                teams
            })
        } catch (error) {
            next(error)
        }
    }
    inviteUserToTeam(){

    }
    async removeTeamById(req,res,next){
        try {
            
            const teamId = req.params.id;
                const team = await TeamModel.findById(teamId);
                if(!team) throw {status:400,message:'team not found'}
                const result = await TeamModel.deleteOne({_id : teamId});
                if(result.deletedCount == 0) throw {status:404 , message : 'team isnt deleted'}
                return res.status(200).json({
                    status:200,
                    success:true,
                   message : 'team deleted successfully'
                })
        } catch (error) {
            next(error)
        }
    }
    updateTeam(){

    }
}

module.exports = {
    TeamController : new TeamController()
}
