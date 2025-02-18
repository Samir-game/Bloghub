const multer = require("multer");
const path = require("path");
const fs = require("fs");


const tempPath = path.resolve(__dirname, "../public/temp");

if (!fs.existsSync(tempPath)) {
    try {
        fs.mkdirSync(tempPath, { recursive: true });
    } catch (err) {
        console.error("Error creating temp directory:", err);
    }
}


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, tempPath);
    },
    filename: function (req, file, cb) {
        
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const fileFilter = (req, file, cb) => {
    const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error("Only images with extension jpg, jpeg, png are allowed."), false);
    }
};

const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }, //5mb
    fileFilter: fileFilter
});

module.exports = upload;
