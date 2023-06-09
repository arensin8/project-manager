const fileupload = require('express-fileupload');
const { createUploadPath } = require('./functions');
const path = require('path');

const uploadFile= (req,res,next) => {
    try {
        if(Object.keys(req.files).length == 0) throw {status:400 , message: "Please upload a image"}
        let image = req.files.image;
        const image_path = path.join(createUploadPath(),(Date.now() + path.extname(image.name)))
        req.body.image = image_path;
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