const fileupload = require('express-fileupload');
const { createUploadPath } = require('./functions');
const path = require('path');

const uploadFile= (req,res,next) => {
    try {
        if(Object.keys(req.files).length == 0) throw {status:400 , message: "Please upload a image"}
        let image = req.files.image;
        let type = path.extname(image.name);
        if(!['.jpeg','.jpg','.gif','.png','.webp'].includes(type)) throw {status:400,message:'image type is incorrect'}
        const image_path = path.join(createUploadPath(),(Date.now() + type))
        req.body.image = image_path.substring(7);
        const uploadPath = path.join(__dirname,"..",".." , image_path)
        image.mv(uploadPath, (err) => {
            if(err) throw {status:500,message:"Image isnt uploaded"}
            next()
        })
    } catch (error) {
        next(error)
    }
    
}

module.exports = {
    uploadFile
}