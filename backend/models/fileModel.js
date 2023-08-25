const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
  path: {
    type: String,
    required: true,
  },
  originalName: {
    type: String,
    required: true,
  },
  password: String,
  downloadCount: {
    type: Number,
    required: true,
    default: 0
  },
  created_At: {
    type: Date,
    default: Date.now
  }

});

const File = mongoose.model("File", fileSchema);
module.exports = File;