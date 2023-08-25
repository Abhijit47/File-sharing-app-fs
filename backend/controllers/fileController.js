const File = require('../models/fileModel');
const bcrypt = require("bcrypt");
const upload = require('../handlers/FileHandlers');
const maxSize = 1 * 1000 * 1000;
const { } = require('../');

const uploadFile = async (req, res, next) => {
  // console.log("Req.body.password", req.body.password);
  // console.log(req.file);
  const maxSize = 2 * 1024 * 1024;

  try {
    if (req.file.size >= maxSize) {
      return res.status(400).json({ message: "File size is too large. Allowed only 2MB." });
    }

    // get the file from req.file
    const fileData = {
      path: req.file.path,
      originalName: req.file.originalname
    };

    // check if the file have provide with password or not
    if (req.body.password !== null && req.body.password !== "") {
      fileData.password = await bcrypt.hash(req.body.password, 10);
    }

    // create a file
    const newFile = await File.create(fileData);
    // console.log(newFile);
    // res.send(newFile.originalName);
    // res.render("index", { fileLink: `${req.headers.origin}/file/${newFile.id}` });
    const saveFile = await newFile.save();
    res.status(200).json({ message: "File upload successfully.", saveFile });

  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getFiles = async (req, res, next) => {
  try {
    const files = await File.find();
    res.status(200).json({ message: "success", files });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getFile = async (req, res, next) => {
  try {
    const id = req.params.id;
    const file = await File.findById(id);
    res.status(200).json({ message: "success", file });
  } catch (err) {
    return res.status(500).json({ message: "Something went wrong..." });
  }
};

const downloadFile = async (req, res, next) => {
  // console.log(req.body);
  // console.log(req.body.password);
  try {
    const { password } = req.body;
    const file = await File.findById(req.params.id);
    // console.log(file.password);

    if (file.password !== undefined) {
      if (password !== undefined && password !== null) {
        if (!(await bcrypt.compare(password, file.password))) {
          return res.status(400).json({ message: "Invalid credentials." });
        }
      }
    }

    // check password
    // if (!(await bcrypt.compare(password, file.password))) {
    //   return res.status(400).json({ message: "Invalid credentials." });
    // }
    // const isvalidPassword = await bcrypt.compare(password, file.password);
    // console.log(isvalidPassword);
    // if (!isvalidPassword) {
    //   return res.status(400).json({ message: "Invalid credentials." });
    // }
    // else {
    //   file.downloadCount++;
    //   await file.save();
    //   res.status(200).download(file.path, file.originalName);
    // }

    file.downloadCount++;
    await file.save();
    // const downloadFile = await file.save();
    // console.log(file.downloadCount);
    // console.log(file.path, file.originalName);
    // res.download(file.path, file.originalName);
    res.status(200).download(file.path, file.originalName);
    // res.status(200).json({ message: "success", downloadFile });
  } catch (error) {
    return res.status(400).json({ message: "Something went wrong with download." });
  }
};

module.exports = { uploadFile, getFiles, getFile, downloadFile };