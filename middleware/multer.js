// const { handleException } = require("../helper/exception");
// const { S3Client } = require("@aws-sdk/client-s3");
// const multer = require("multer");
// const multerS3 = require("multer-s3");

// const s3 = new S3Client({
//   region: process.env.AWS_S3_REGION,
//   credentials: {
//     accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//     secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
//   },
// });

// const allowedFormats = [
//   // Images
//   "image/jpeg", // .jpg, .jpeg
//   "image/jpg", // .jpg (alternative)
//   "image/png", // .png
// ];

// const fileFilter = (req, file, cb) => {
//   console.log("file.mimetype", file.mimetype);
//   if (allowedFormats.includes(file.mimetype)) {
//     cb(null, true);
//   } else {
//     const error = new Error(
//       "Invalid file type. Only .JPG, .PNG are allowed."
//     );
//     handleException(req.logger, req.res, error);
//     cb(error, false);
//   }
// };

// const upload = multer({
//   storage: multerS3({
//     s3: s3,
//     bucket: process.env.AWS_S3_BUCKET,
//     key: (req, file, cb) => {
//       const filename = `${Date.now()}-${file.originalname}`;
//       cb(null, filename);
//     },
//   }),
//   fileFilter: fileFilter,
//   limits: { fileSize: 1024 * 1024 * 15 }, // Limit file size to 15MB
// });

// module.exports = upload;

const multer = require("multer");
const path = require("path");
const fs = require("fs");
const { handleException } = require("../helper/exception");

const allowedFormats = ["image/jpeg", "image/jpg", "image/png"];

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, "..", "uploads");
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const filename = `${Date.now()}-${file.originalname}`;
    cb(null, filename);
  },
});

const fileFilter = (req, file, cb) => {
  if (allowedFormats.includes(file.mimetype)) {
    cb(null, true);
  } else {
    const error = new Error("Invalid file type. Only .JPG, .PNG are allowed.");
    handleException(req.logger, req.res, error);
    cb(error, false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 1024 * 1024 * 15 }, // 15MB
});

module.exports = upload;
