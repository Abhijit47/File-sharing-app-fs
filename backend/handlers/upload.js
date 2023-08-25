const multer = require("multer");
// const upload = multer({ dest: "uploads" });
// module.exports = upload;



const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads');
  },
  filename: (req, file, cb) => {
    cb(null, req.params.id + '_' + file.originalname);
  }
});

// const storage = multer({ dest: "uploads" });

// let obj = {
//   storage: storage,
//   limits: {
//     fileSize: 2 * 1024 * 1024
//   },
// };

// const upload = multer(obj);
// module.exports = upload;

// const upload = multer(obj).single("file");
// exports.fileUpload = (req, res) => {
//   upload(req, res, function (error) {
//     if (error) { //instanceof multer.MulterError
//       res.status(500);
//       if (error.code == 'LIMIT_FILE_SIZE') {
//         error.message = 'File Size is too large. Allowed file size is 2MB';
//         error.success = false;
//       }
//       return res.json(error);
//     } else {
//       if (!req.file) {
//         res.status(500);
//         res.json('file not found');
//       }
//       res.status(200);
//       res.json({
//         success: true,
//         message: 'File uploaded successfully!'
//       });
//     }
//   });
// };

module.exports = upload;