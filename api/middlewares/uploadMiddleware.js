const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb){
        cb(null, './uploads/');
    },
    filename: function (req, file, cb){
        const ext = path.extname(file.originalname);
        cb(null, file.fieldname + '-' + ext);
    }
});

const uploadMiddleware = multer({storage});

module.exports = uploadMiddleware;