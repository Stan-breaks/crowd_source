const mongoose = require("mongoose");
const pictureSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true,
  },
  created: {
    type: Date,
    default: Date.now,
  },
});
