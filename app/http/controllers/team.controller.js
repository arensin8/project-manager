const { TeamModel } = require("../../model/team.model");

class TeamController {
    async createTeam(req,res,next){
        try {
            const owner = req.user._id;
            const {name,description , username} = req.body;
            const team = await TeamModel.create({
                name,
                description,
                username,
                owner
            });
            if(!team) throw {status:500 , message:'team isnt created'}
            return res.status(200).json({
                status:200,
                success:true,
                message:'team created successfully'
            })
        } catch (error) {
            next(error)
        }

    }
    inviteUserToTeam(){

    }
    removeTeamById(){

    }
    updateTeam(){

    }
}

module.exports = {
    TeamController : new TeamController()
}
