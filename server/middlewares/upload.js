const multer = require('multer');
const fs = require('fs');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const folderPath = '../client/public/uploads/product';
        if (!fs.existsSync(folderPath)) {
            fs.mkdirSync(folderPath, { recursive: true });
        }
        cb(null, folderPath);
    },
    filename: (req, file, cb) => {
        const productId = req.params.id;
        const fileExt = path.extname(file.originalname);
        const uniqueFileName = `${productId}${fileExt}`;
        cb(null, uniqueFileName);
    }
});

const fileFilter = (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif/;
    const mimeType = allowedTypes.test(file.mimetype);
    const extName = allowedTypes.test(path.extname(file.originalname).toLowerCase());

    if (mimeType && extName) {
        return cb(null, true);
    } else {
        cb(new Error('Only image files are allowed.'));
    }
};

const uploadProduct = multer({
    storage,
    limits: { fileSize: 1024 * 1024 * 5 },
    fileFilter: fileFilter
}); // Utilisez `.single('file')`

module.exports = uploadProduct;
