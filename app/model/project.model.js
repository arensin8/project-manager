const {default : mongoose, Schema, model} = require('mongoose');
const projectSchema = new Schema({
    title : {type: String , required :true},
    text : {type: String},
    image : {type: [mongoose.Types.ObjectId] , default : "/defaults/default.png"},
    owner : {type: mongoose.Types.ObjectId , required : true},
    team : {type: mongoose.Types.ObjectId },
    private : {type: Boolean , default :true},
    tags : {type: mongoose.Types.ObjectId , required:true},
},{
    timestamps:true
});

const ProjectModel = model("project", projectSchema);
module.exports = {
    ProjectModel
}