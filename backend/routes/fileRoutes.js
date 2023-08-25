const express = require("express");
const { uploadFile, getFiles, getFile, downloadFile } = require("../controllers/fileController");
const router = express.Router();
const upload = require("../handlers/FileHandlers");

router.route("/upload")
  .post(upload.single('file'), uploadFile);

router.route("/files")
  .get(getFiles);

router.route("/file/:id")
  .get(getFile);

router.route("/download/:id")
  .get(downloadFile)
  .post(downloadFile);
// router.route("/download/:id")
//   .get(downloadFile);
// router.route("/file/:id")
//   .post(downloadFile);

module.exports = router;