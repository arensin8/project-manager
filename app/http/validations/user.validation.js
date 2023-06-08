const { body } = require("express-validator");
const path = require('path');

function imageValidator(){
    return [
        body("image").custom( (value, {req}) => {
            if(Object.keys(req.file).length == 0) throw "please upload a image"
            const ext = path.extname(req.file.originalname)
            const exts = ['.jpg','.jpeg','.webp','.gif','.png']
            if(!exts.includes(ext)) throw 'image format is incorrect'
            // 2Mb
            const maxSize = 2 *1024 *1024
            if(req.file.size > maxSize) throw "image size is bigger than 2mb"
            return true
        })
    ]
}

module.exports = {
    imageValidator
}