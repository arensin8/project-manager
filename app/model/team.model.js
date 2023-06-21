const {default : mongoose, Schema, model} = require('mongoose');
const teamSchema = new Schema({
    name : {type: String , required :true},
    description : {type: String},
    username: {type : String , required :true , unique : true},
    users : { type: [mongoose.Types.ObjectId] , default : []},
    owner : {type: mongoose.Types.ObjectId , required:true}
},{
    timestamps:true
});

const TeamModel = model("team", teamSchema);
module.exports = {
    TeamModel
}