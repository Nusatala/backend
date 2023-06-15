const multer = require('multer');
const multerGoogleStorage = require('multer-google-storage');

let imagePath = "";
const uploadHandler = multer({
    storage: multerGoogleStorage.storageEngine({
        autoRetry: true,
        bucket: 'nusatala-images',
        projectId: 'nusatala-team-project',
        keyFilename: './service-key.json',
        contentType: ( req, file ) => {
            return "image/jpeg";
        },
        filename: (req, file, cb) => {
            imagePath = `user-scans/${Date.now()}_${file.originalname}`;
            cb(null, imagePath);
            module.exports = {
                imagePath,
            }
        }
    })
});

const uploadHandler2 = multer({
    storage: multerGoogleStorage.storageEngine({
        autoRetry: true,
        bucket: 'nusatala-images',
        projectId: 'nusatala-team-project',
        keyFilename: './service-key.json',
        contentType: ( req, file ) => {
            return "image/jpeg";
        },
        filename: (req, file, cb) => {
            imagePath = `scans/${Date.now()}_${file.originalname}`;
            cb(null, imagePath);
            module.exports = {
                imagePath,
            }
        }
    })
});

module.exports = {
    uploadHandler,
    uploadHandler2
}