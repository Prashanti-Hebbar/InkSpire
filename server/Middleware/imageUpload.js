const multer = require('multer');

const storage = multer.diskStorage({
    destination:function (req,file,cb) {  //cb - callback function
        cb(null, 'uploads/')

    },
    filename:function(req,file,cb){
        // cb(null, file.fieldname + '-' + Date.now())
        cb(null, file.originalname + '-' + Date.now())
    }
})

const upload = multer({storage:storage})

module.exports = upload;