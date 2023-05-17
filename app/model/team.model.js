const {default : mongoose, Schema, model} = require('mongoose');
const teamSchema = new Schema({
    name : {type: String , required :true},
    description : {type: String},
    users : {type: [mongoose.Types.ObjectId] , default : []},
    owner : {type: mongoose.Types.ObjectId , required:true}
},{
    timestamps:true
});

const TeamModel = model("team", teamSchema);
module.exports = {
    TeamModel
}