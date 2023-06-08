const { userModel } = require("../../model/user.model");

class UserController{
    getProfile(req, res, next) {
        try {
          const user = req.user;
          user.profile_Image = req.protocol + '://' + req.get('host') + "/" + (user.profile_Image.replace(/[\\\\]/gm, '/'))
          return res.status(200).json({
            status: 200,
            success: true,
            user,
          });
        } catch (error) {
          next(error);
        }
      }
    async editProfile(req,res,next){
        try {
            let data = req.body;
            const userId = req.user._id
            let fields = ["first_name", "last_name", "skills"];
            let badValues = ["", " ", null , undefined, 0, -1 , NaN , [] , {}];
            Object.entries(data).forEach(([key,value]) => {
                if(!fields.includes(key)) delete data[key];
                if(badValues.includes(value)) delete data[key];
            })
            console.log(data);
            const result =await userModel.updateOne({_id : userId} , {$set : data});
            if(result.modifiedCount > 0){
                return res.status(200).json({
                    status:200,
                    success:true,
                    message:"update completed"
                })
            }
            throw {status :400, message:"update uncompleted"}
        } catch (error) {
            next(error)
        }
    }
    async uploadProfileImage(req,res,next){
        try {
            const userID = req.user._id;
            if(Object.keys(req.file) == 0) throw {status:400,message:"please upload a picture"}
            const pathName = req.file?.path.replace("\\","/").substring(7);
            const result = await userModel.updateOne({_id:userID} , {$set: {profile_Image:pathName}})
            if(result.modifiedCount == 0) throw {status:400,message:"image isn't uploaded"}
            return res.status(200).json({
                status:200,
                success:true,
                message:"image uploaded"
            })
        } catch (error) {
            next(error)
        }
    }
    addSkills(){

    }
    editSkills(){

    }
    acceptInviteToTeam(){

    }
    rejectInviteToTeam(){

    }
}

module.exports = {
    UserController : new UserController()
}