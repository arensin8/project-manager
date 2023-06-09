const { ProjectModel } = require("../../model/project.model");

class ProjectController {
    async createProject(req, res, next){
        try {
          const {title, text } = req.body;
          const owner = req.user._id
          const result = await ProjectModel.create({title, text, owner})
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
  getAllPRojects() {}
  getProjectById() {}
  getAllProjectOfTeam() {}
  getProjectOfUser() {}
  updateProject() {}
  removeProject() {}
}

module.exports = {
  ProjectController: new ProjectController(),
};
