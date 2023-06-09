const { ProjectModel } = require("../../model/project.model");

class ProjectController {
    async createProject(req, res, next){
        try {
          const {title, text ,tags,image} = req.body;
          const owner = req.user._id
          const result = await ProjectModel.create({title, text, owner, image ,tags})
          if(!result) throw {status : 400, message : "Project isnt created"}
          return res.status(201).json({
            status : 201,
            success: true,
            message : "Project created successfully"
          })
        } catch (error) {
          next(error)
        }
      }
  async getAllPRojects(req,res,next) {
    try {
        const owner = req.user._id;
        const projects = await ProjectModel.find({owner})
        return res.status(200).json({
            status:200,
            success:true,
            projects
        })
    } catch (error) {
        next(error)
    }
  }
  getProjectById() {}
  getAllProjectOfTeam() {}
  getProjectOfUser() {}
  updateProject() {}
  removeProject() {}
}

module.exports = {
  ProjectController: new ProjectController(),
};
