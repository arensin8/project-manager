const autoBind = require("auto-bind");
const { ProjectModel } = require("../../model/project.model");
const { userModel } = require("../../model/user.model");
const { createLinkForFiles } = require("../../modules/functions");

class ProjectController {
  constructor() {
    autoBind(this);
  }
  async createProject(req, res, next) {
    try {
      const { title, text, tags, image } = req.body;
      const owner = req.user._id;
      const result = await ProjectModel.create({
        title,
        text,
        owner,
        image,
        tags,
      });
      if (!result) throw { status: 400, message: "Project isnt created" };
      return res.status(201).json({
        status: 201,
        success: true,
        message: "Project created successfully",
      });
    } catch (error) {
      next(error);
    }
  }
  async getAllPRojects(req, res, next) {
    try {
      const owner = req.user._id;
      const projects = await ProjectModel.find({ owner });
      for (const project of projects) {
        project.image = createLinkForFiles(project.image, req);
      }
      return res.status(200).json({
        status: 200,
        success: true,
        projects,
      });
    } catch (error) {
      next(error);
    }
  }

  async findProject(projectID, owner) {
    const project = await ProjectModel.findOne({ owner, _id: projectID });
    if (!project) throw { status: 404, message: "project not found" };
    return project;
  }
  async getProjectById(req, res, next) {
    try {
      const owner = req.user._id;
      const projectID = req.params.id;
      const project = await this.findProject(projectID, owner);
      project.image = createLinkForFiles(project.image, req);
      return res.status(200).json({
        status: 200,
        success: true,
        project,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
  async removeProject(req, res, next) {
    try{
      const owner = req.user._id;
      const projectID = req.params.id;
      await this.findProject(projectID, owner);
      const deleteProjectResult = await ProjectModel.deleteOne({_id : projectID});
      if(deleteProjectResult.deletedCount == 0) throw {status : 400, message : "project isnt deleted"}
       return res.status(200).json({
         status : 200, 
         success : true,
         message : "project deleted successfully"
       })
    }catch(error){
      next(error)
    }
  }
  async updateProject(req, res, next) {
    try {
      const owner = req.user._id;
      const projectID = req.params.id;
      await this.findProject(projectID, owner);
      const data = { ...req.body };
      Object.entries(data).forEach(([key, value]) => {
        if (!["title", "text", "tags"].includes(key)) delete data[key];
        if (["", " ", 0, null, undefined, NaN].includes(value))
          delete data[key];
        if (key == "tags" && data["tags"].constructor === Array) {
          data["tags"] = data["tags"].filter((val) => {
            if (!["", " ", 0, null, undefined, NaN].includes(val)) return val;
          });
          if (data["tags"].length == 0) delete data["tags"];
        }
      });
      const updateResult = await ProjectModel.updateOne(
        { _id: projectID },
        { $set: data }
      );
      if (updateResult.modifiedCount == 0)
        throw { status: 400, message: " project isnt updated" };
      return res.status(200).json({
        status: 200,
        success: true,
        message: "project updated",
      });
    } catch (error) {
      next(error);
    }
  }
  async updateProjectImage(req, res, next){
    try {
      const {image} = req.body;
      const owner = req.user._id;
      const projectID = req.params.id;
      await this.findProject(projectID, owner);
      const updateResult = await ProjectModel.updateOne({_id : projectID}, {$set : {image}})
      if(updateResult.modifiedCount == 0) throw {status : 400, message : "Image isnt updated"}
      return res.status(200).json({
        status : 200,
        success : true,
        message : "Image update succesfully"
      })
    } catch (error) {
      next(error)
    }
  }
  getAllProjectOfTeam() {}
  getProjectOfUser() {}
}

module.exports = {
  ProjectController: new ProjectController(),
};
